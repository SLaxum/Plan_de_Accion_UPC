var tabla;

function init(){
	mostrarform(false);
	listar();

	$("#formulario").on("submit",function(e)
	{
		guardaryeditar(e);
	})

	$("#imagenmuestra").hide();

	//permisos
	$.post("../ajax/usuario.php?op=permisos&id=", function(r){
		$("#permisos").html(r);
	});
}

//funcion limpiar
function limpiar()
{
	
	$("#idusuario").val("");
	$("#primer_apellido").val("");
	$("#segundo_apellido").val("");
	$("#primer_nombre").val("");
	$("#segundo_nombre").val("");
	$("#tipo_documento").val("");
	$("#num_documento").val("");
	$("#direccion").val("");
	$("#telefono").val("");
	$("#email").val("");
	$("#cargo").val("");
	$("#login").val("");
	$("#clave").val("");
	$("#imagen").val("");
	$("#imagenmuestra").attr("src","");
	$("#imagenactual").val("");
}

//funcion mostrar formulario
function mostrarform(flag)
{
	limpiar();
	if (flag) 
	{
		$("#listadoregistros").hide();
		$("#formularioregistros").show();
		$("#btnGuardar").prop("disabled",false);
	}
	else
	{
		$("#listadoregistros").show();
		$("#formularioregistros").hide();
	}
}

//funcion cancelar form
function cancelarform()
{
	limpiar();
	mostrarform(false);
}

//funcion listar
function listar()
{
	tabla=$('#tbllistado').dataTable(
	{
		"aProcessing": true,
		"aServerSide": true,
		dom: 'Bfrtip',
		buttons: [
		'copyHtml5',
		'excelHtml5',
		'csvHtml5',
		'pdf'
		],
		"ajax":
		{
			url: '../ajax/usuario.php?op=listar',
			type : "get",
			dataType : "json",
			error: function(e){
				console.log(e.responseText);
			}
		},
		"bDestroy": true,
		"iDisplayLength": 5,//paginacion
		"order": [[0, "desc"]]
	}).DataTable();
}

//funcion guardar o editar
function guardaryeditar(e)
{
	e.preventDefault();
	$("#btnGuardar").prop("disabled",true);
	var formData = new FormData($("#formulario")[0]);


	$.ajax({
		url: "../ajax/usuario.php?op=guardaryeditar",
		type : "POST",
		data: formData,
		contentType: false,
		processData: false,

		success: function(datos)
		{
			alert(datos);
			mostrarform(false);
			tabla.ajax.reload();
		}
	});
	limpiar();
}

//funcion mostrar datos a modificar
function mostrar(idusuario)
{
	$.post("../ajax/usuario.php?op=mostrar",{idusuario : idusuario}, function(data, status)
	{
		data = JSON.parse(data);
		mostrarform(true);

		$("#primer_apellido").val(data.primer_apellido);		
		$("#segundo_apellido").val(data.segundo_apellido);
		$("#primer_nombre").val(data.primer_nombre);		
		$("#segundo_nombre").val(data.segundo_nombre);
		$("#tipo_documento").val(data.ptipo_documentorograma);		
		$('#tipo_documento').selectpicker('refresh');
		$("#num_documento").val(data.num_documento);
		$("#direccion").val(data.direccion);		
		$("#telefono").val(data.telefono);
		$("#email").val(data.email);		
		$("#cargo").val(data.cargo);
		$("#login").val(data.login);		
		$("#clave").val(data.clave);
		$("#imagenmuestra").show();
		$("#imagenmuestra").attr("src","../files/usuarios/"+data.imagen);
		$("#imagenactual").val(data.imagen);
		$("#idusuario").val(data.idusuario);
	});

	$.post("../ajax/usuario.php?op=permisos&id="+idusuario, function(r){
		$("#permisos").html(r);
	});
}

//funcion desactivar
function desactivar(idusuario)
{
	bootbox.confirm("¿Esta seguro de desactivar el usuario?", function(result){
		if (result) 
		{
			$.post("../ajax/usuario.php?op=desactivar",{idusuario : idusuario}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}

//funcion desactivar
function activar(idusuario)
{
	bootbox.confirm("¿Esta seguro de activar el usuario?", function(result){
		if (result) 
		{
			$.post("../ajax/usuario.php?op=activar",{idusuario : idusuario}, function(e){
				bootbox.alert(e);
				tabla.ajax.reload();
			});
		}
	})
}


init();