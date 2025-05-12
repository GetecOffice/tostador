from django.db import models

# Create your models here.

class tblEstatusSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    Descripcion = models.CharField(max_length=100, null = True, default= "N/A")

class tblUnidadSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    Descripcion = models.CharField(max_length=100, null = True, default= "N/A")

class tblModeloSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    Descripcion = models.CharField(max_length=100, null = True, default= "N/A")
    
class tblAreaOperacionSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    Descripcion = models.CharField(max_length=100, null = True, default= "N/A")     
    
class tblAltaSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    Tag = models.CharField(max_length=100, null = True, default= "N/A")
    Descripcion = models.CharField(max_length=100, null = True, default= "N/A")
    Comentario = models.CharField(max_length=100, null = True, default= "N/A")
    IDModelo = models.ForeignKey(tblModeloSensores, on_delete=models.DO_NOTHING, null=True)
    IDEstatus = models.ForeignKey(tblEstatusSensores, on_delete=models.DO_NOTHING, null=True)
    IDUnidad = models.ForeignKey(tblUnidadSensores, on_delete=models.DO_NOTHING, null=True) 
    FechaInstalado = models.DateField(null=True)
    FechaMantenimiento = models.DateField(null=True)
    
class tblDatoSensores(models.Model):
    ID = models.AutoField(primary_key=True)
    IDSensor = models.ForeignKey(tblAltaSensores, on_delete=models.DO_NOTHING, null=True)
    Datos = models.CharField(max_length=100, null = True, default= "N/A")
    Fecha = models.DateField(null=True)
    Hora = models.TimeField(null=True, default="00:00:00")
    
class tblFiltroTostador(models.Model):
    ID = models.AutoField(primary_key=True)
    Filtro = models.IntegerField(null = True, default= "N/A")

class tblDatoLineaTostador(models.Model):
    ID = models.AutoField(primary_key=True)
    NoLinea = models.CharField(max_length=100, null = True, default= "N/A")
    Folio = models.CharField(max_length=100, null = True, default= "N/A")
    TmpInicial = models.CharField(max_length=100, null = True, default= "N/A")
    TmpTostado = models.CharField(max_length=100, null = True, default= "N/A")
    TmpEnfriado = models.CharField(max_length=100, null = True, default= "N/A")
    TmpoElevado = models.CharField(max_length=100, null = True, default= "N/A")
    Operador = models.CharField(max_length=100, null = True, default= "N/A")
    BatchVerde = models.CharField(max_length=100, null = True, default= "N/A")
    CantAgua = models.CharField(max_length=100, null = True, default= "N/A")
    TempCorte = models.CharField(max_length=100, null = True, default= "N/A")
    PesoTostado = models.CharField(max_length=100, null = True, default= "N/A")
    Destino = models.CharField(max_length=100, null = True, default= "N/A")
    FechaYHora = models.DateTimeField(null=True)
    