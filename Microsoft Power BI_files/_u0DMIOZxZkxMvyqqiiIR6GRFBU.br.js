var mapsNamespace=window.$MicrosoftMaps8,internalNamespace=mapsNamespace.Internal,Network=internalNamespace._Network,GlobalConfig=mapsNamespace.GlobalConfig,ConfigurableMap=function(){function n(){}return n.createFromConfig=function(t,i,r,u,f,e){Network.downloadJson(i,"configurableMap",function(i,r){n._downloadConfigCallback(t,f,e,i,r)},function(t,i,r){n._downloadErrorCallback(e,t,i,r)},null,r,null,!0,u)},n._createMapObject=function(n,t){typeof t.mapOptions.center=="string"&&(t.mapOptions.center=mapsNamespace.Location.parseLatLong(t.mapOptions.center));return new mapsNamespace.Map(n,t.mapOptions)},n._downloadConfigCallback=function(t,i,r,u){try{var f=this._createMapObject(t,u);n._loadAdditionalModules(u.modules,i,r,f)}catch(e){r&&r(e)}},n._loadAdditionalModules=function(t,i,r,u){var e,f,o;if(t&&t.length>0){for(e=[],f=0,o=t.length;f<o;f++)e.push(t[f].moduleName);var s=function(){n._allModulesLoadedCallback(t,i,r,u)},h=function(n){r&&r(n)},c={credentials:u.getOptions().credentials,callback:s,errorCallback:h};mapsNamespace.Module.loadModule(e,c)}else i&&i(u)},n._downloadErrorCallback=function(n,t,i,r){var u=r?r:i;n&&n(u)},n._allModulesLoadedCallback=function(t,i,r,u){for(var e,s="",f=0,h=function(){f===0&&(s.length>0?r&&r(s):i&&i(u),f=-1)},o=0,f=length=t.length;o<length;o++)if(e=t[o].moduleName,n._supportedModuleActions[e]&&t[o].moduleOptions)try{n._supportedModuleActions[e](e,t[o].moduleOptions,function(){f--;h()},function(n){s+=e+":"+n+";";f--;h()},u)}catch(c){s+=e+":"+c+";";f--}else f--;h()},n._GeoXMLPostLoadingAction=function(n,t,i,r,u){for(var f,h,o=t instanceof Array?t:[t],s=!0,e=0;e<o.length;e++)f=o[e],f.addLayerFromUrl?(h=new mapsNamespace.GeoXmlLayer(f.addLayerFromUrl,!0,f.geoXmlOption),u.layers.insert(h)):(s=!1,r("Data URL is required"));s&&i()},n._GeoJsonPostLoadingAction=function(n,t,i,r,u){for(var o,f,s=t instanceof Array?t:[t],h=!0,e=0;e<s.length;e++)o=s[e],o.addLayerFromUrl?(f=o.geoJsonOption,mapsNamespace.GeoJson.readFromUrl(o.addLayerFromUrl,function(t){var o=f&&f.layerName&&f.layerName.trim()?f.layerName.trim():n+"_"+e,r=new mapsNamespace.Layer(o);r.add(t);u.layers.insert(r);i()},f?f.jsonpQueryParam:null,f?f.style:null)):(h=!1,r("Data URL is required"));h&&i()},n._supportedModuleActions={"Microsoft.Maps.GeoXml":n._GeoXMLPostLoadingAction,"Microsoft.Maps.GeoJson":n._GeoJsonPostLoadingAction},n}();mapsNamespace.ConfigurableMap=ConfigurableMap