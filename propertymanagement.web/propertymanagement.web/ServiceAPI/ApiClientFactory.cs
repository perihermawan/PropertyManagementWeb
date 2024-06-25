using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Http.Internal;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

using propertymanagement.web.Infrastructure;

using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace propertymanagement.web.ServiceAPI
{
    public class ApiClientFactory
    {
        private readonly IHttpContextAccessor accessor;
        private static HttpClient client;

        public ApiClientFactory(HttpClient _client, IHttpContextAccessor accessor)
        {
            this.accessor = accessor;

            if (client == null)
            {
                client = _client;
                SetHttpClient();
            }
        }
        
        private void SetHttpClient()
        {
            client.DefaultRequestHeaders.Clear();
            client.Timeout = TimeSpan.FromSeconds(60);
            //client.DefaultRequestHeaders.Add("X-APP-KEY", "keypass:phoenix");
            client.DefaultRequestHeaders.AcceptEncoding.Add(new StringWithQualityHeaderValue("utf-8"));
            client.DefaultRequestHeaders.ConnectionClose = true;
        }

        public string GetToken()
        {
            return accessor.HttpContext.Session.GetString("TokenSessionKey");
        }

        private void SetBearerToken()
        {
            var token = accessor.HttpContext.Session.GetString(AppConstants.TokenSessionKey);
            if (!string.IsNullOrWhiteSpace(token))
            {
                client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", token);
            }
            else
            {
                 accessor.HttpContext.Response.Redirect("/Authentication/Logout");
            }
        }

        private StringContent SetParameter(object parameter)
        {
            if (parameter == null)
                return null;

            return new StringContent(JsonConvert.SerializeObject(parameter), Encoding.UTF8, "application/json");
        }

        private async Task<string> GetResponseMessage(HttpResponseMessage response)
        {
            //SetBearerToken();
            var message = await response.Content.ReadAsStringAsync();
            if (response.IsSuccessStatusCode)
                return message;
            else
            {
                message = message.ToLower();
                if (message.Contains("status") && message.Contains("description") && message.Contains("statuscode"))
                {
                    var model = JsonConvert.DeserializeObject<ApiErrorResponse>(message);
                    var ex = new ApiException(model.Description)
                    {
                        StatusCode = model.StatusCode,
                        Status = model.Status
                    };
                    throw ex;
                }

                var exception = new ApiException(response.ReasonPhrase)
                {
                    StatusCode = response.StatusCode,
                    Status = message
                };
                throw exception;
            }
        }

        public async Task<ApiResponse> Upload(string url, FormFile file)
        {
            SetBearerToken();
            using (MemoryStream ms = new MemoryStream())
            {
                file.OpenReadStream().CopyTo(ms);
                using (var content = new MultipartFormDataContent())
                {
                    var bytes = new ByteArrayContent(ms.ToArray());
                    bytes.Headers.Add("Content-Type", file.ContentType);
                    content.Add(bytes, "file", file.FileName);

                    var response = await client.PostAsync(url, content);
                    var json = await response.Content.ReadAsStringAsync();
                    return JsonConvert.DeserializeObject<ApiResponse>(json);
                }
            }
        }

        #region STRING Data
        public async Task<string> Get(string url)
        {
            SetBearerToken();
            var response = await client.GetAsync(url);
            return await GetResponseMessage(response);
        }

        public async Task<string> GetLogin(string url)
        {
            var response = await client.GetAsync(url);
            return await GetResponseMessage(response);
        }

        public async Task<string> Post(string url, object parameter)
        {
            SetBearerToken();
            using (var content = SetParameter(parameter))
            {
                var response = await client.PostAsync(url, content);
                return await GetResponseMessage(response);
            }
        }

        public async Task<string> Post(string url, object parameter, params IFormFile[] files)
        {
            SetBearerToken();
            using (MultipartFormDataContent multiContent = new MultipartFormDataContent())
            {
                if (files != null)
                {
                    var index = 0;
                    foreach (var file in files)
                    {
                        if (file != null)
                        {
                            multiContent.Add(new StreamContent(file.OpenReadStream()), "files_" + index.ToString(), file.FileName);
                        }
                        index++;
                    }
                }

                if (parameter != null)
                {
                    multiContent.Add(SetParameter(parameter), parameter.GetType().Name);
                }

                var response = await client.PostAsync(url, multiContent);
                return await GetResponseMessage(response);
            }
        }

        public async Task<string> Put(string url, object parameter, params IFormFile[] files)
        {
            SetBearerToken();
            using (MultipartFormDataContent multiContent = new MultipartFormDataContent())
            {
                if (files != null)
                {
                    var index = 0;
                    foreach (var file in files)
                    {
                        if (file != null)
                        {
                            multiContent.Add(new StreamContent(file.OpenReadStream()), "files_" + index.ToString(), file.FileName);
                        }
                        index++;
                    }
                }

                if (parameter != null)
                {
                    multiContent.Add(SetParameter(parameter), parameter.GetType().Name);
                }

                var response = await client.PutAsync(url, multiContent);
                return await GetResponseMessage(response);
            }
        }

        public async Task<string> Put(string url, object parameter = null)
        {
            SetBearerToken();
            using (var content = SetParameter(parameter))
            {
                var response = await client.PutAsync(url, content);
                return await GetResponseMessage(response);
            }
        }

        public async Task<string> Delete(string url)
        {
            SetBearerToken();
            var response = await client.DeleteAsync(url);
            return await GetResponseMessage(response);
        }
        #endregion

        #region  OBJECT Data
        private bool IsPrimitiveType(Type type)
        {
            return
                type == typeof(string) ||
                type == typeof(byte) ||
                type == typeof(sbyte) ||
                type == typeof(short) ||
                type == typeof(ushort) ||
                type == typeof(int) ||
                type == typeof(uint) ||
                type == typeof(long) ||
                type == typeof(ulong) ||
                type == typeof(float) ||
                type == typeof(double) ||
                type == typeof(char) ||
                type == typeof(decimal) ||
                type == typeof(bool) ||
                type == typeof(DateTime) ||
                type == typeof(TimeSpan);
        }

        private T GetData<T>(string json, JsonSerializerSettings settings = null)
        {
            if (string.IsNullOrWhiteSpace(json))
                return default(T);

            json = json.Trim();

            var token = JToken.Parse(json);
            var t = typeof(T);

            //if (token is JArray)
            if (token is JObject)
            {
                var jobj = JObject.Parse(json);
                var rest = jobj.SelectToken("Data");

                if (IsPrimitiveType(t))
                {
                    return (T)Convert.ChangeType(rest.Value<object>(), t);
                }

                if (rest != null)
                    json = rest.ToString();
            }


            if (string.IsNullOrWhiteSpace(json) || json == "[]" || json == "{}")
                return default(T);

            //if (typeof(IEnumerable).IsAssignableFrom(t))
            //{
            //    t = t.GetElementType();
            //    if (IsPrimitiveType(t))
            //        return JsonConvert.DeserializeObject<T>(json);
            //}

            return JsonConvert.DeserializeObject<T>(json, settings);
        }

        public async Task<T> Post<T>(string url, object parameter, params IFormFile[] files)
        {
            SetBearerToken();
            using (MultipartFormDataContent multiContent = new MultipartFormDataContent())
            {
                if (files != null)
                {
                    foreach (var file in files)
                        multiContent.Add(new StreamContent(file.OpenReadStream()), "files", file.FileName);
                }

                if (parameter != null)
                {
                    multiContent.Add(SetParameter(parameter), parameter.GetType().Name);
                }

                var response = await client.PostAsync(url, multiContent);
                var message = await GetResponseMessage(response);
                return GetData<T>(message);
            }
        }

        public async Task<T> Put<T>(string url, object parameter, params IFormFile[] files)
        {
            SetBearerToken();
            using (MultipartFormDataContent multiContent = new MultipartFormDataContent())
            {
                if (files != null)
                {
                    foreach (var file in files)
                        multiContent.Add(new StreamContent(file.OpenReadStream()), "files", file.FileName);
                }

                if (parameter != null)
                {
                    multiContent.Add(SetParameter(parameter), parameter.GetType().Name);
                }

                var response = await client.PutAsync(url, multiContent);
                var message = await GetResponseMessage(response);
                return GetData<T>(message);
            }
        }

        public async Task<T> Post<T>(string url, object parameter)
        {
            var message = await Post(url, parameter);
            return GetData<T>(message);
        }

        public async Task<T> Put<T>(string url, object parameter = null)
        {
            var message = await Put(url, parameter);
            return GetData<T>(message);
        }

        public async Task<T> Delete<T>(string url)
        {
            var message = await Delete(url);
            return GetData<T>(message);
        }

        public async Task<T> Get<T>(string url, JsonSerializerSettings settings = null)
        {
            var message = await Get(url);
            return GetData<T>(message, settings);

        }
        #endregion

        #region API RESPONSE Data
        public async Task<ApiResponse> GetApiResponse<T>(string url)
        {
            var message = await Get(url);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }
        public async Task<ApiResponse> GetApiResponseLogin<T>(string url)
        {
            var message = await GetLogin(url);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }


        public async Task<ApiResponse> PostApiResponse<T>(string url, object parameter = null)
        {
            var message = await Post(url, parameter);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }

        public async Task<ApiResponse> PostApiResponse<T>(string url, object parameter = null, params IFormFile[] files)
        {
            var message = await Post(url, parameter, files);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }

        public async Task<ApiResponse> PutApiResponse<T>(string url, object parameter = null)
        {
            var message = await Put(url, parameter);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }
        public async Task<ApiResponse> PutApiResponse<T>(string url, object parameter = null, params IFormFile[] files)
        {
            var message = await Put(url, parameter, files);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }

        public async Task<ApiResponse> DeleteApiResponse<T>(string url)
        {
            var message = await Delete(url);
            var obj = JsonConvert.DeserializeObject<ApiResponse>(message);

            obj.Data = GetData<T>(message);
            return obj;
        }
        #endregion

    }
}
