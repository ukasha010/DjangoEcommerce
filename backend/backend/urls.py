from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



admin.site.site_header = 'Yusra Administration'                    
admin.site.index_title = 'Yusra Administation'                
admin.site.site_title = 'Yusra Adminsitration'


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('products.urls')),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
