using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
//using SPA.System.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Web;
using propertymanagement.web.Common;
using Serilog;
using Microsoft.Extensions.Logging;
using Serilog.Core;
using Serilog.Events;
using propertymanagement.web.ServiceAPI;
using propertymanagement.web.Infrastructure;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Mvc.NewtonsoftJson;
using Microsoft.Extensions.Hosting;
using Microsoft.AspNetCore.Mvc.Razor;

namespace propertymanagement.web
{
    public class Startup
    {
        public Startup(IWebHostEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                //.AddCloudFoundry()
                .AddEnvironmentVariables();

            Configuration = builder.Build();
            Log.Logger = new LoggerConfiguration()
            .ReadFrom.Configuration(Configuration)
            .CreateLogger();
        }
        public IConfigurationRoot Configuration { get; }
        //public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddHttpClient<ApiClientFactory>();
            services.AddDistributedMemoryCache();
            services.AddSession(options =>
            {
                options.IdleTimeout = TimeSpan.FromDays(1);
                options.Cookie.IsEssential = true;
            });

            services.AddControllersWithViews();
            services.AddRazorPages();
            //services.AddControllersWithViews().AddRazorRuntimeCompilation();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, Microsoft.AspNetCore.Hosting.IWebHostEnvironment env, ILoggerFactory loggerFactory)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }
            AppContextStatic.Configure(app.ApplicationServices.GetRequiredService<IHttpContextAccessor>());
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCors(builder =>
            {
                builder.WithOrigins("http://103.175.218.25:3005", "http://localhost:3005", "http://spaserver3:3005", "*")
                .AllowAnyHeader().AllowAnyMethod().AllowCredentials();
            });
            app.UseRouting();

            app.UseSession();
            app.UseAuthorization();
            //app.UseMvc(routes =>
            //{
            //    routes.MapRoute(
            //        name: "default",
            //        template: "{controller=Authentication}/{action=Index}/");
            //    //routes.MapRoute(
            //    //    name: "transaction",
            //    //    template: "{transaction}/{accounting}/{controller}/{action=Index}");
            //});
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapAreaControllerRoute(
                   name: "Accounting",
                   areaName: "Accounting",
                   pattern: "Accounting/{controller=ARPayment}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                   name: "Master",
                   areaName: "Master",
                   pattern: "Master/{controller=Unit}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                   name: "Master",
                   areaName: "Master",
                   pattern: "Master/{controller=UserManagement}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Master",
                 areaName: "Master",
                 pattern: "Master/{controller=Employee}/{action=Index}");
                //endpoints.MapAreaControllerRoute(
                // name: "Marketing",
                // areaName: "Marketing",
                // pattern: "Marketing/{controller=Rent}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing",
                 pattern: "Marketing/{controller=Deposit}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing",
                 pattern: "Marketing/{controller=Deposit}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing", 
                 areaName: "Marketing/PaymentSchedule",
                 pattern: "Marketing/PaymentSchedule/{controller=Rent}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/Rent",
                 pattern: "Marketing/Rent/{controller=Rent}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/Rent",
                 pattern: "Marketing/Rent/{controller=RentAmount}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/Rent/RentCharge",
                 pattern: "Marketing/Rent/RentCharge/{controller=NonStandard}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                    name: "Marketing",
                    areaName: "Marketing",
                    pattern: "Marketing/{controller=MF}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                    name: "Marketing",
                    areaName: "Marketing",
                    pattern: "Marketing/{controller=Utility}/{action=Index}");
                //endpoints.MapAreaControllerRoute(
                // name: "Marketing",
                // areaName: "Marketing",
                // pattern: "Marketing/{controller=RentAmount}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/RevenueSharing",
                 pattern: "/Marketing/RevenueSharing/{controller=RsKSM}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/RevenueSharing",
                 pattern: "/Marketing/RevenueSharing/{controller=RsRentAmount}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/RevenueSharing/RsCharge",
                 pattern: "/Marketing/RevenueSharing/RsCharge/{controller=RsChargeFlat}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing/RevenueSharing/RsCharge",
                 pattern: "/Marketing/RevenueSharing/RsCharge/{controller=RsChargeProgressive}/{action=Index}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing",
                 pattern: "Marketing/{controller=DataUnitPuschart}/{action=Index}/{id?}");
                endpoints.MapAreaControllerRoute(
                 name: "Marketing",
                 areaName: "Marketing",
                 pattern: "Marketing/{controller=RentAmount}/{action=Index}/{id?}");
                endpoints.MapAreaControllerRoute(
                 name: "Finance",
                 areaName: "Finance",
                 pattern: "Finance/{controller=GenerateInv}/{action=Index}/{id?}");
                endpoints.MapControllerRoute(
                    name: "areaRoute",
                    pattern: "{area:exists}/{controller}/{action}/{id?}"
                );
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Authentication}/{action=Index}/");
            });

            //    endpoints.MapControllerRoute(
            //        name: "default",
            //        pattern: "{controller=Home}/{action=Index}/{id?}");
            //});
            //app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
        }
    }
}
