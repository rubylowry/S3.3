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











function renderCardHomePage(){
    document.getElementById('communityPhotos').innerHTML = `
    <div class="col-md-4">
    <div class="card mb-4 shadow-sm">
      <svg class="bd-placeholder-img card-img-top m-2" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/><text x="50%" y="50%" fill="#eceeef" dy=".3em">Thumbnail</text></svg>
      <div class="card-body">
        <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">Username</h2></div>
        <p class="card-text">This is a wider card with supporting text</p>
        <div class="text-right">
          <div >
            <button type="button" class="btn btn-sm btnPrimaryBlackFont">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

renderCardHomePage();
