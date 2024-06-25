using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
//using System.Runtime.Caching;
using Microsoft.Extensions.Caching.Memory;

namespace propertymanagement.web.Cache
{
    public static class ApplicationCacheManager
    {
        public static readonly string AppConfigCacheKey = "app_config";
        public static readonly string GeneralCategoryCacheKey = "generalcategory_config";
        public static readonly string PermissionCacheKey = "permission_config";
        public static readonly string PermissionMenuCacheKey = "permissionmenu_config";
        private static object _locker = new object();

        private static IMemoryCache MemCache;
        //public ScheduledStuff(IMemoryCache memCache)
        //{
        //    MemCache = memCache;
        //}
        //public static void GenerateConfigs()
        //{
        //    lock (_locker)
        //    {
        //        using (var Db = new DbHelper())
        //        {
        //            var config = Db.ConfigRepository.FindAll().ToList();
        //            var generalCategory = Db.GeneralCategoryRepository.FindAll().ToList();

        //            Set(AppConfigCacheKey, config);
        //            Set(GeneralCategoryCacheKey, generalCategory);
        //        }
        //    }
        //}

        //public static void RefreshRolePermissions()
        //{
        //    lock (_locker)
        //    {
        //        using (var Db = new DbHelper())
        //        {
        //            var rolePermission = Db.RolePermissionRepository.FindAll().ToList();
        //            var menu = Db.MenuRepository.FindAll().ToList();

        //            Set(PermissionCacheKey, rolePermission);
        //            Set(PermissionMenuCacheKey, menu);
        //        }
        //    }
        //}
        //public static void GenerateAllCaches()
        //{
        //    lock (_locker)
        //    {
        //        using (var Db = new DbHelper())
        //        {
        //            var config = Db.ConfigRepository.FindAll().ToList();
        //            var generalCategory = Db.GeneralCategoryRepository.FindAll().ToList();

        //            var rolePermission = Db.RolePermissionRepository.FindAll();
        //            var menu = Db.MenuRepository.FindAll();

        //            Set(AppConfigCacheKey, config);
        //            Set(GeneralCategoryCacheKey, generalCategory);
        //            Set(PermissionCacheKey, rolePermission);
        //            Set(PermissionMenuCacheKey, menu);
        //        }
        //    }
        //}
        //public static void RefreshMenu()
        //{
        //    lock (_locker)
        //    {
        //        using (var Db = new DbHelper())
        //        {
        //            var menu = Db.MenuRepository.FindAll().ToList();

        //            Set(PermissionMenuCacheKey, menu);
        //        }
        //    }
        //}

        //public static T Get<T>(string key)
        //{
        //    var cache = MemCache;

        //    return (T)cache[key];
        //}

        //public static void Set(string key, object obj)
        //{
        //    var cache = MemCache;
        //    var objCache = cache.Get(key);

        //    if (objCache != null)
        //    {
        //        cache.Remove(key);
        //    }

        //    cache..Insert(key, obj);
        //}

        //public static IEnumerable<RolePermission> GetPermissions(IEnumerable<string> roles)
        //{
        //    if (roles == null) return new List<RolePermission>();

        //    var cache = HttpContext.Current.Cache;
        //    var permissions = cache.Get(PermissionCacheKey) as IEnumerable<RolePermission>;

        //    return permissions.Where(x => roles.Contains(x.RoleName));
        //}

        //public static T GetConfig<T>(string key, string module = null)
        //{
        //    var value = string.Empty;

        //    if (HttpContext.Current != null)
        //    {
        //        var cache = HttpContext.Current.Cache;
        //        var configurations = cache.Get(AppConfigCacheKey) as IEnumerable<Config>;
        //        Func<Config, bool> expr = null;

        //        if (!string.IsNullOrEmpty(module))
        //            expr = x => x.ConfigKey == key && x.Module == module;
        //        else
        //            expr = x => x.ConfigKey == key;

        //        value = configurations.FirstOrDefault(expr).ConfigValue;
        //    }
        //    else
        //    {
        //        value = ConfigurationManager.AppSettings[key];
        //    }

        //    return (T)System.Convert.ChangeType(value, typeof(T));
        //}

        //public static IEnumerable<GeneralCategory> GetCategories(string category)
        //{
        //    var cache = HttpContext.Current.Cache;

        //    var generalCategories = cache.Get(GeneralCategoryCacheKey) as IEnumerable<GeneralCategory>;

        //    return generalCategories.Where(x => x.Category == category).OrderBy(x => x.Name);
        //}
    }
}
