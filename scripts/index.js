$(document).ready(function(){
    function loadGrid(){
        $("#tableGrid").empty();
    $.get("/products", function(data, status){


     
          
            $("#tableGrid").append("<thead class='thead-dark'><th>Name</th><th>Price</th><th>Actions</th>");
            $("#tableGrid").append("<tbody>");
            for(var i=0;i<data.length;i++)
            {
                
                $("#tableGrid").append("<tr><td style='display:none;'>" +data[i]._id + "</td><td>"+data[i].name+"</td>"+"<td>"+data[i].price+"</td><td><button id='btnGrid' class='btn btn-danger'>Delete</button>&nbsp;<button id='btnGrid' class='btn btn-info'>View</button>&nbsp;<button id='btnGrid' class='btn btn-primary'>Edit</button></td></tr>");

               
              
            } 
            $("#tableGrid").append("</tbody>");    
            
           
      });
    
    }
    loadGrid();
      $('#tableGrid').on('click','button', function() {
        if($( this ).text()=="View")
        {
           
            $('#testButton').attr('data-target','#exampleModal');
            $('#testButton').attr('modal','modal');
           
            $.get("/products/"+$( this ).parent().parent().children("td:first").text(), function(data, status){


                    $("#pname").text(data.name);
                    $("#pprice").text(data.price);
                    $('#exampleModal').modal('show');
                    
                
               
          });


        }

        if($( this ).text()=="Delete")
        {
           
           
            $.ajax({
                url: '/products/"+'+$( this ).parent().parent().children("td:first").text()+'/delete',
                type: 'DELETE',
                success: function(result) {
                   
                    $('#deleteMsgModal').modal('show');
                    
                    loadGrid();
                }
            }); 
        

        }

        if($( this ).text()=="Edit")
        {

            var record=$( this ).parent().parent().children("td:first").text();
            $.get("/products/"+$( this ).parent().parent().children("td:first").text(), function(data, status){


                $("#nameUpdate").val(data.name);
                $("#priceUpdate").val(data.price);
             
                
                $("#idUpdate").val(record);
                $('#UpdateModel').modal('show');
                
            
           
        });





            

        }
       
        // alert( $( this ).parent().parent().children("td:first").text() );
      });
      $("#btnAdd").click(function(){
       
        $('#insertModel').modal('show');
        

      });

      $("#btnSave").click(function(){
        $.post("/products/Create",
        {
          name: $("#name").val(),
          price:$("#price").val()
        },
        function(data, status){
            loadGrid();
            $('#insertModel').modal('hide');
            $("#name").val('');
            $("#price").val('');
        });

      })
      $("#btnUpdate").click(function(){
      
        $.ajax({
            url: '/products/'+$("#idUpdate").val()+'/Update',
            type: 'PUT',
           data:{
            name:$("#nameUpdate").val(),
            price:$("#priceUpdate").val()
            },
            success: function(result) {
               
                $('#UpdateModel').modal('hide');
                
                loadGrid();
            },
            error:function(err)
            {

                alert(err);
            }
        }); 

      });

    });
