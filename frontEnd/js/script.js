//Javascript for navbar and main homePage animations

//hide and seek animation
$("#hidePlants").click(function(){
  $("#hidePlants").hide();
});

$("#hideLion").click(function(){
  $("#hidePlants").show();
  $("#hideSeal").show();
  $("#hideLion").hide();
});

$("#hideSeal").click(function(){
  $("#hidePlants").show();
  $("#hideLion").show();
  $("#hideSeal").hide();
});

$(".hideSeekExitMessage").click(function(){
  $("#hideAndSeekPopUp").hide();
});

$("#hideAndSeek").click(function(){
  $("#hideAndSeekPopUp").toggle();
});



// End of hide and seek animation
//fox animation
$("#orangeCircle").click(function(){
  $("#orangeFox").show();
  $("#purpleFox").hide();
  $("#blueFox").hide();
  $("#yellowFox").hide();
});

$("#purpleCircle").click(function(){
  $("#purpleFox").show();
  $("#orangeFox").hide();
  $("#blueFox").hide();
  $("#yellowFox").hide();
});

$("#blueCircle").click(function(){
  $("#blueFox").show();
  $("#orangeFox").hide();
  $("#purpleFox").hide();
  $("#yellowFox").hide();
});

$("#yellowCircle").click(function(){
  $("#yellowFox").show();
  $("#orangeFox").hide();
  $("#purpleFox").hide();
  $("#blueFox").hide();
});

//End of fox animation



//End of Javascript for navbar and main homePage animations


// start of mission sound animations


      $("#missionOneSound").click(function(){
        var audio = new Audio("assets/mission1Sound.mp3");
          audio.play();
        $(".missionOneSplash").show();
        $(".missionOneSplash").addClass("missionOneText");
      });


      $(".missionOneSplashText").click(function(){
        $(".missionTwoImg").show();
        $("#missionTwoSound").show();
        $(".missionOneSplash").hide();
        $(".missionOneImg").hide();
        $("#missionOneSound").hide();
      });

      $("#missionTwoSound").click(function(){
        var audio = new Audio("assets/mission2Sound.mp3");
          audio.play();

          $(".missionTwoSplash").show();
          $(".missionTwoSplash").addClass("missionTwoText");
      });

      $(".missionTwoSplashText").click(function(){
        $(".missionThreeImg").show();
        $("#missionThreeSound").show();
        $(".missionTwoSplash").hide();
        $(".missionTwoImg").hide();
        $("#missionTwoSound").hide();
        console.log("i am clicked");
      });

      $("#missionThreeSound").click(function(){
        var audio = new Audio("assets/mission3Sound.mp3");
        audio.play();

        $(".missionThreeSplash").show();
        $(".missionThreeSplash").addClass("missionThreeText");
      });




// end of misiion sound animations


// start of form animation and form validation

//testing login / sign up navigation
$("#signUpHomePage").click(function(){
  $("#signUpPage").attr('style',"display: block !important");
  $("#loginPage").attr('style',"display: nnone !important")
  $("#homePage").hide();
  $(".navBlock").hide();
});

$("#logInHomePage").click(function(){
  $("#loginPage").attr('style',"display: block !important")
  $("#signUpPage").attr('style',"display: none !important");
  $("#homePage").hide();
  $(".navBlock").hide();
});

//end of login /sign up navigation



function animatedForm(){

	const arrows = document.querySelectorAll(".fa-arrow-down");

	arrows.forEach(arrow =>{

		arrow.addEventListener("click",() => {

			const input = arrow.previousElementSibling;
			const parent = arrow.parentElement;
			const nextForm = parent.nextElementSibling;
			console.log(input);
			console.log(parent);

			// validation checking sign up
			if(input.type === "text" && validateUser(input)){
				nextSlide(parent, nextForm);
			} else if(input.type === "email" && validateEmail(input)){
				nextSlide(parent, nextForm);
			}else if (input.type === "password" && validatePassword(input)){
				nextSlide(parent, nextForm);
			}else{
				parent.style.animation = "shake 0.6s ease";
			}


			parent.addEventListener('animationend', () =>{
				parent.style.animation = "";
			});

		});
	});
}



function validateUser(user){
		const validateUserName = /^\w{6,30}$/;
		if (validateUserName.test(user.value)){
			success();
			$('#errorMessage').hide();
			$('#signUpUserName').hide();
      $(".userNameText").hide();
      $(".emailText").show();
			return true;
		}else {
			error();
			$('#errorMessage').show();
			$('#signUpUserName').show();
		}
}

function validateEmail(email){
	const validationEmail = /^[^\s@]+@[^0-9][^\s@]+\.(?=.{1,5}$)[^0-9][^\s@]+$/;
	if (validationEmail.test(email.value)){
		success();
		$('#errorMessage').hide();
		$('#signUpEmail').hide();
    $(".emailText").hide();
    $(".passwordText").show();
		return true
	} else {
		error();
		$('#errorMessage').show();
		$('#signUpEmail').show();
	}
}

function validatePassword(password){
	const passwordValidation = /(?=.{6,40}$)/;
	if(passwordValidation.test(password.value)){
		success();
		$('#errorMessage').hide();
		$('#signUpPassword').hide();
		return true;
	} else {
		console.log('not enough characters');
		error();
		$('#errorMessage').show();
		$('#signUpPassword').show();
	}
}

function nextSlide(parent, nextForm){
	parent.classList.add('inactive');
	parent.classList.remove('active');
	nextForm.classList.add('active');
}


function error(){

  $("#signUpPage").css("backgroundColor","#ffffff");
  $(".fieldName").css("border","2px solid tomato");
  $(".fieldName").css("backgroundColor","#ffffff");
  $(".fieldEmail").css("border","2px solid tomato");
  $(".fieldEmail").css("backgroundColor","#ffffff");
  $(".fieldPassword").css("border","2px solid tomato");
  $(".fieldPassword").css("backgroundColor","#ffffff");

}

function success(){
  $("#signUpPage").css("backgroundColor","#faf2e8");
}

animatedForm();


//end of form animation and and form validation

//End of Javascript for navbar and main homePage animations


//Natalia's code

function renderCardHomePage(){
    document.getElementById('communityPhotos').innerHTML = `<div class="col-md-4">
    <div class="card cardSkin mb-4">
      <svg class="bd-placeholder-img card-img-top m-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      <div class="card-body">
        <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">Username</h2></div>
        <p class="card-text">This is a wider card with supporting text</p>
        <div class="text-right">
          <div>
            <button type="button" class="btn btn-sm btnPrimaryBlackFont">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}
//not completed - requires styling by Natalia
function renderCardProfilePage(){
  document.getElementById('communityPhotosProfilePage').innerHTML = `<div class="card cardSkin containerImg">
  <img src="card-img-top m-2" src="https://drive.google.com/uc?export=view&id=12rbthUs_tRTDY4dYBuj5mmxwrj5NaP4V" alt="Card image cap">
  <button class="btn btn-primary">Button</button>
</div>`
  
  // <div class="container">
  // <div class="cardStructure">
  // <img class="card-img-top m-2" src="https://drive.google.com/uc?export=view&id=12rbthUs_tRTDY4dYBuj5mmxwrj5NaP4V" alt="Card image cap">
  //   <button href="#" class="btn btn-primary buttonOverlay">View post</button>
  // </div>
  // </div>
  
}

renderCardHomePage();
renderCardProfilePage();

//modal home page

function openModalViewPost(){
  //we need to show modal with class modal
return `<div class="modal" id="myModal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">Modal title</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <div class="closeModalSkin closeModalStructure" aria-hidden="true">&times;</div>
      </button>
    </div>
    <div class="modal-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mr-4">
          <div class="card borderNone mb-4">
            <svg class="bd-placeholder-img card-img-top m-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
            <div class="card-body">
              <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">Username</h2></div>
              <p class="card-text">This is a wider card with supporting text</p>
              <div class="text-right">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 ml-4">
          <div class="container">
            <div>
              <h2>Comments</h2>
              <div id="commentsModalHome">Other users' comments</div>
            </div>
            <form action="/action_page.php">
              <div class="form-group">
                <label for="comment" class="font-weight-bold" >Add comment</label>
                <textarea class="form-control" rows="2" id="comment" name="text"></textarea>
              </div>
              <button type="submit" class="btn btn-warning">Post</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</div>
</div>`
}

$('#btnViewHomeTest').click(function(){
  $('#myModalContainer').html(openModalViewPost());
  $('#myModal').modal();
});

//Natalia's code ENDS

//add photo

// empty all inputs on add product form
	$("#addPhotoBtn").click(function(){
		    $('#addPhotoName').val('');
		    $('#addPhotoDescription').val('');
		    $('#addPhotoId').val('');
	});
//add photo
      $('#addPhotoBtn').click(function(){
             let name = $('#addPhotoName').val();
             let desc = $('#addPhotoDescription').val();
             let imageId = $('#addPhotoId').val();
             let imageUrl = `https://drive.google.com/uc?id=${imageId}`;

             if(imageId.includes("google") || imageId.includes("drive") || imageId.includes("open")){
			                swal({
				                title: 'Wrong image format',
				                text: 'Please enter the image ID instead of the whole link',
				                icon: 'warning',
				                button: 'Yes',
				                timer: 2500
			                });
			                $("#wrongImageAlert").slideDown();

            }
            else if (name == '' || desc == '' || imageId == ''){
                           alert('Please enter all details');
		                     }
		                     else {
                           $.ajax({
                                    url :`${url}/addPhoto`,
                                    type :'POST',
                                    data:{
                                      title : title,
                                      description : desc,
                                      image : imageUrl,
                                    },
                                    success : function(data){
                                      showMyPhoto("display");
                                      $('#addPhotoModal').modal('hide');
                                      swal({
                                        title: 'Success!',
                                        text: `Congratulations! Your photo has been added`,
                                        icon: 'success',
                                        button: 'Yes',
                                        timer: 2500
                                      });
                                      showMyPhoto();
                                    },
                                    error:function(){
                                      console.log('error: cannot call api');
                                    }
                      });//ajax
                    } // else
                  });//add photo form

                  // show add project
                      $('#addPhotoBtn').click(function(){
                        document.getElementById("addOwnerName").value = sessionStorage.getItem('userFullName') + " " + sessionStorage.getItem('userLastName');
                        $('#addPhotoName').val("");
                        $('#addPhotoDescription').val("");
                        $('#addPhotoId').val("");
                        $('#addPhotoForm').show();
                      });
