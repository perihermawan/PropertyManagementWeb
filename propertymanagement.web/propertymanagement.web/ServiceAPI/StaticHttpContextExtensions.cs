using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Text;

namespace propertymanagement.web.ServiceAPI
{

    public static class StaticHttpContextExtension
    {
        public static void AddHttpContextAccessorMarvels(this IServiceCollection services)
        {
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        }

        public static IApplicationBuilder UseStaticHttpContextMarvels(this IApplicationBuilder app)
        {
            var httpContextAccessor = app.ApplicationServices.GetRequiredService<IHttpContextAccessor>();
            StaticHttpContextAccessor.Configure(httpContextAccessor);
            return app;
        }
    }

    public static class StaticHttpContextAccessor
    {
        private static IHttpContextAccessor _httpContextAccessor;

        public static void Configure(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public static HttpContext Current => _httpContextAccessor.HttpContext;

        //public static CodeMarvel.Infrastructure.Options.ConnectionStringOption ConnectionStringOption =>
        //    _httpContextAccessor.HttpContext.RequestServices.GetService<CodeMarvel.Infrastructure.Options.ConnectionStringOption>();

    }
}
