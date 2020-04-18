$('#registerForm').submit(function(){
  event.preventDefault();
  let username = $('#regUserName').val();
  let email = $('#regEmail').val();
  let password = $('#regPassword').val();

  console.log(username,email, password);
  if (username == '' || email == '' || password == ''){
    alert('Please enter all details');
  } else {

  $.ajax({
    url :`${url}/registerUser`,
    type :'POST',
    data:{
      username : username,
      email : email,
      password : password
      },

    success : function(user){
      console.log(user);
      if (!(user == 'username taken already. Please try another one')) {
        alert('You successfully signed up');
        $('#loginBtn').show();
        $('#registerBtn').hide();
        $('#registerForm').hide();
      } else {
        alert('username taken already. Please try another one');
        $('#regUserName').val('');
        $('#regEmail').val('');
        $('#regPassword').val('');

      }

    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error


  });//ajax

}//else
});//submit function for registerForm

function isLoggedIn(){
  return sessionStorage['userName'] !== undefined;
}

$('#loginForm').submit(function(){
  event.preventDefault();
  let username = $('#loginUserName').val();
  let password = $('#loginPassword').val();
  console.log(username, password);
  if (username == '' || password == ''){
    alert('Please enter all details');
  } else {
  $.ajax({
    url :`${url}/loginUser`,
    type :'POST',
    data:{
      username : username,
      password : password
      },
    success : function(user){
      console.log(user);
      if (user == 'User not found. Please register'){
      alert('user not found. Please enter correct data or register a new user');
      } else if (user == 'Not Authorized'){
        alert('Please try with correct details');
        $('#username').val('');
        $('#password').val('');
      } else{
         // when shown after login/sign up forms colums of home-container display in one col

        sessionStorage.setItem('userId', user['_id']);
        sessionStorage.setItem('userName',user['username']);
        sessionStorage.setItem('userEmail',user['email']);
        toggleLogin();
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
}//else
});//submit function for login loginForm

// Jacob
//start of form animation and form validation
//testing login / sign up navigation
$("#signUpHomePage").click(function(){
  $("#signUpPage").attr('style',"display: block !important");
  $("#loginPage").attr('style',"display: none !important");
  $("#aboutPage").attr('style',"display: none !important");
  $("#homePage").hide();
});

$("#signUpAbout").click(function(){
  $("#signUpPage").attr('style',"display: none !important");
  $("#aboutPage").attr('style',"display: block !important");
  $("#loginPage").attr('style',"display: none !important");
  $("#homePage").hide();
  $(".navBlock").hide();
});

$("#logInHomePage").click(function(){
  $("#loginPage").attr('style',"display: block !important")
  $("#signUpPage").attr('style',"display: none !important");
  $("#aboutPage").attr('style',"display: none !important");
  $("#homePage").hide();
  $(".navBlock").hide();
});

$("#aboutHomePage").click(function(){
  $("#signUpPage").attr('style',"display: block !important");
  $("#aboutPage").attr('style',"display: none !important");
  $("#homePage").hide();
});

$(".foxFaceNav").click(function(){
  $(".navBlock").show();
  $("#homePage").show();
  $("#loginPage").attr('style',"display: none !important");
  $("#signUpPage").attr('style',"display: none !important");
  $("#aboutPage").attr('style',"display: none !important");
});

$(".missionThreeSplashText").click(function(){
  $(".navBlock").hide();
  $("#homePage").hide();
  $("#signUpPage").attr('style',"display: block !important");
});

$("#signUpData").click(function(){
  $("#loginPage").attr('style',"display: block !important")
  $("#signUpPage").attr('style',"display: none !important");
});

//end of login /sign up navigation

$("#signUpSubmitBtn").click(function(){
    $("#loginPage").attr('style',"display: block !important")
    $("#signUpPage").attr('style',"display: none !important");
    $("#aboutPage").attr('style',"display: none !important");
    $("#homePage").hide();
    $(".navBlock").hide();
});

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
				$(".fieldPassword").hide();
        $("#signUpSubmitBtn").show();
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
    const minUserNameLength = 6;
		if (user.value.length < minUserNameLength){
			error();
			$('#errorMessage').show();
      $('#signUpUserName').show();
      return false;
		}
    
    success();
    $('#errorMessage').hide();
    $('#signUpUserName').hide();
    $(".userNameText").hide();
    $(".emailText").show();
    return true;
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
		$('.passwordText').hide();
		$('.thankYouMessage').show();
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
//End of Javascript for navbar and main homePage animations
$(".hideSeekExitMessage").click(function(){
  $("#hideAndSeekPopUp").hide();
});

$("#hideAndSeek").click(function(){
  $("#hideAndSeekPopUp").toggle();
});

//Jacob's code ENDS

//Natalia's code
function urlReady(){
  loadPostsHomePage();
}
communityPosts = [];
function loadPostsHomePage(){
  document.getElementById('communityPhotos').innerHTML='';
  $.ajax({
    url :`${url}/allPosts`,
    type :'GET',
    success : function(posts){
      communityPosts = posts;
      for(var i = 0; i< posts.length; i++){
        renderCardHomePage(posts[i], 'communityPhotos');
      }
    },
    error: function(){

    }
  });
}

function renderCardHomePage(post, containerId){
  const viewButtonId = "btnView" + post._id;
    document.getElementById(containerId).innerHTML += `<div class="col-md-4">
    <div class="card cardSkin m-5">
      <img src="${post.imageUrl}" class="bd-placeholder-img card-img-top m-2"/>
      <div class="card-body">
        <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">${post.username}</h2></div>
        <p class="card-text">${post.description}</p>
        <div class="text-right">
          <div>
            <button id="${viewButtonId}" class="btn btn-sm btnPrimaryBlackFont" onclick="openModalViewPostHomePage('${post._id}')">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}

function renderCardProfilePage(post){

    document.getElementById('viewPostPhotoContainer').innerHTML += `<div class="col-md-4">
    <div class="card cardSkin m-5">
      <img src="${post.imageUrl}" class="bd-placeholder-img card-img-top m-2"/>
      <div class="card-body">
        <div><img class="avatarSkin d-inline"><h2 class="d-inline ml-1">${post.username}</h2></div>
        <p class="card-text">${post.description}</p>
        <div class="text-right">
          <div>
          <button class="btn btn-sm btnPrimaryBlackFont" onclick="deletePost('${post._id}')">Delete</button>
          <button class="btn btn-sm btnPrimaryBlackFont" onclick="openModalViewPostProfilePage('${post._id}')">View</button>
          </div>
        </div>
      </div>
    </div>
  </div>`;
}
function openModalViewPostProfilePage(postId){
  let post = myPosts.filter(p => p._id == postId)[0];

  let commentsList = post.comments ? "<ul>"  + post.comments.map(c => `<li><b>${c.userName}</b>: ${c.text}`).join() + "</ul>" : "";
  //we need to show modal with class modal
let modalBody = `<div class="modal" id="myModal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">${post.title}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <div class="closeModalSkin closeModalStructure" aria-hidden="true">&times;</div>
      </button>
    </div>
    <div class="modal-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mr-4">
          <div class="card borderNone mb-4">
            <img src="${post.imageUrl}" class="bd-placeholder-img card-img-top m-2" />
            <div class="card-body">
              <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">${post.username}</h2></div>
              <p class="card-text">${post.description}</p>
              <div class="text-right">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 ml-4">
          <div class="container">
            <div>
              <h2>Comments</h2>
              
              ${commentsList}
            </div>
              <div class="form-group">
                <label for="comment" class="font-weight-bold" >Add comment</label>
                <textarea id="addCommentArea" class="form-control" rows="2" id="comment" name="text"></textarea>
              </div>
              <button class="btn btn-warning" onclick="addComment('${post._id}')">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</div>
</div>`;

$('#myModalContainer').html(modalBody);
$('#myModal').modal();

}


//modal home page
function openModalViewPostHomePage(postId){
  let post = communityPosts.filter(p => p._id == postId)[0];
  let addCommentForm = isLoggedIn() ? `<div class="form-group">
  <label for="comment" class="font-weight-bold" >Add comment</label>
  <textarea id="addCommentArea" class="form-control" rows="2" id="comment" name="text"></textarea>
</div>
<button class="btn btn-warning" onclick="addComment('${post._id}')">Post</button>`: 'To add comment, please log in';

  let commentsList = post.comments ? "<ul>"  + post.comments.map(c => `<li><b>${c.userName}</b>: ${c.text}`).join() + "</ul>" : "";
  //we need to show modal with class modal
let modalBody = `<div class="modal" id="myModal" tabindex="-1" role="dialog">
<div class="modal-dialog modal-lg" role="document">
  <div class="modal-content">
    <div class="modal-header">
      <h5 class="modal-title">${post.title}</h5>
      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        <div class="closeModalSkin closeModalStructure" aria-hidden="true">&times;</div>
      </button>
    </div>
    <div class="modal-body">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-4 mr-4">
          <div class="card borderNone mb-4">
            <img src="${post.imageUrl}" class="bd-placeholder-img card-img-top m-2" />
            <div class="card-body">
              <div><img class="avatarSkin d-inline" src="assets/avatar-natalia.jpg"><h2 class="d-inline ml-1">${post.username}</h2></div>
              <p class="card-text">${post.description}</p>
              <div class="text-right">
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 ml-4">
          <div class="container">
            <div>
              <h2>Comments</h2>
              ${commentsList}
            </div>
             ${addCommentForm}
          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  </div>
</div>
</div>`;

$('#myModalContainer').html(modalBody);
$('#myModal').modal();
}

function addComment(postId){

  let post = communityPosts.filter(p => p._id == postId)[0];
  let commentText = $("#addCommentArea").val();
  let userName = sessionStorage.userName;
  let comment = {"text": commentText, "username": userName};
  post.comments.push(comment);
    $.ajax({
      url :`${url}/addComment`,
      type :'POST',
      data: {
        postId: post._id,
        commentText: commentText,
        userName: userName
       },
      success : function(post){
        console.log(post);
      },
      error: function(){

      }
      });
}


//Natalia's code ENDS

//James code
console.log(sessionStorage);
console.log(sessionStorage['userId']);

let url;
sessionStorage;

//get url and port from config.json
$.ajax({
  url :'config.json',
  type :'GET',
  dataType :'json',
  success : function(configData){
    // console.log(configData);
    url = `${configData.SERVER_URL}:${configData.SERVER_PORT}`;
    urlReady();
    // console.log(url);
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
});//ajax

function toggleLogin(){
  if (isLoggedIn()) {
    $('#homePage').show();
    $("#logInHomePage").hide();
    $('#loginPage').hide();
    $("#signUpHomePage").hide();
    $('#logouthomePage').show();
    $('#userName').show();
    showUserName(sessionStorage.userName);
    $('#landingPage').hide();
    $('#loginLandingPage').show();
    $(".album").hide();
    refreshMyUploads();
  } else {
    $('#homePage').show();
    $('#landingPage').show();
    $(".album").show();
    $('#loginLandingPage').hide();
    $("#logInHomePage").show();
    $("#signUpHomePage").show();
    $("#profilePageContainer").hide();
    $('#logouthomePage').hide();
    $('#userName').hide();
  }
}

$(document).ready(function(){
  // console.log("js is working");
  
  $("#profilePageContainer").hide();
  $('#homePage').show();
  toggleLogin();
  $("#goToProfileBtn").click(function(){
    $("#homePage").hide();
    $("#profilePageContainer").show();
  });

  $('#addPostContainer').hide();
  $('#addPhotoBtn').click(function(){
    $('#addPostContainer').show();
    $('#viewPostPhotoContainer').hide();
  });
  
  //remove if not required
  // $('#uploadPhoto').click(function(){
  //   $('#addPostContainer').hide();
  //   $('#viewPostPhotoContainer').show();
  // });


  // stuff needed:

  // View User --  done
  // Add User -- done
  // Delete User -- im an idiot and don't know how to do it
  // Update User - don't need / im an idiot and don't know how to do it

  // Login User -- done
  // Logout User -- 

  // View All Posts --
  // View A Specific Post --
  // Add Post -- done
  // Delete Post -- done
  // Update Post -- done



  //logout button
  $('#logouthomePage').click(function(){
    sessionStorage.clear();
    toggleLogin();
  });

  //View User JS and login
  $('#loginSubmitBtn').click(function(){
    let username = $('#inputUsernameLogin').val();
    let password = $('#inputPasswordLogin').val();
    $.ajax({
      url :`${url}/loginUser`,
      type :'POST',
      data:{
        username : username,
        password : password
      },
      success : function(loginData){
        console.log(loginData);
        if (loginData === 'Please fill in all areas') {
          alert('Please fill in all areas')
        }else if (loginData === 'User not found. Please register') {
          alert('Register please')
        } else if (loginData === 'Not Authorized') {
          alert('Incorrect Password')
        } else {
          sessionStorage.setPost('userId',loginData['_id']);
          sessionStorage.setPost('userName',loginData['username']);
          sessionStorage.setPost('userEmail',loginData['email']);
          console.log(sessionStorage);
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });

  //Add User
  $('#signUpSubmitBtn').click(function(){
    let username = $('#inputUserNameSignup').val();
    let email = $('#inputEmailSignup').val();
    let password = $('#inputPasswordSignup').val();
    console.log(username,email, password);
    $.ajax({
      url :`${url}/addUser`,
      type :'POST',
      data:{
        username : username,
        email : email,
        password : password
      },
      success : function(loginData){
        console.log(loginData);
        if (loginData === 'Please fill in all areas') {
          alert('Please fill in all areas')
        } else if (loginData === 'Username taken already. Please try another one') {
          alert('Username taken already. Please try another one')
        } else {
          sessionStorage.setPost('userId',loginData['_id']);
          sessionStorage.setPost('userName',loginData['username']);
          sessionStorage.setPost('userEmail',loginData['email']);
          console.log(sessionStorage);
          showUserName(sessionStorage.userName);
        }
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });

  // View Post
  $.ajax({
    url :`${url}/allPosts`,
    type :'GET',
    dataType :'json',
    success : function(postsFromMongo){
      console.log(postsFromMongo);
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax

});

$('#addPostForm').submit(function(){
  event.preventDefault();
  let postName = $('#addPostImageName').val();
  let postDescription = $('#addPostDescription').val();
  let postImageUrl = $('#addPostImageUrl').val();
  let userName = sessionStorage.userName;
  if (postName == '' || postDescription == '' || userName == ''){
    alert('Please enter all details');
  } else {
  $.ajax({
    url :`${url}/addPost`,
    type :'POST',
    data: {
      title : postName,
      description : postDescription,
      username : userName,
      imageUrl: postImageUrl,
      userId: sessionStorage['userId']
      },
    success : function(post){
      console.log(post);
      $('#addPostImageName').val('');
      $('#addPostDescription').val('');
      $('#addPostImageUrl').val('');
      refreshMyUploads();
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
}//else
});//submit function for addProduct
posts = [];
function refreshMyUploads(){
  $.ajax({
    url :`${url}/myposts/${sessionStorage['userId']}`,
    type :'GET',
    success : function(posts){
      myPosts = posts;
      $("#viewPostPhotoContainer").html("");
      for(var i = 0; i < posts.length; i++){
        renderCardProfilePage(posts[i]);
      }
    },//success
    error:function(){
      console.log('error: calling the server');
    }//error
  });//ajax
}

// Update Post
$('#postUpdateBtn').click(function(){
  event.preventDefault();
  let postId = $('#updatePostId').val();
  let postUsername = $('#updatePostUsername').val();
  let userId = $('#updatePostUserId').val();
  let postDescription = $('#updatePostDescription').val();
  let postImage = $('#updatePostImage').val();

  $.ajax({
    url :`${url}/updatePost/${postId}`,
    type :'PATCH',
    data:{
      _id: postId,
      username : postUsername,
      description : postDescription,
      imageUrl: postImage
    },
    success : function(data){
      console.log(data);
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
});


// Delete post

function deletePost(postId){
  if(!window.confirm("Are you sure you want to delete this post?")){
    return;
  }
    $.ajax({
    url :`${url}/deletePost/${postId}`,
    type :'DELETE',
    success : function(data){
      console.log(data);
      if (data=='deleted'){
        alert('deleted');
        refreshMyUploads();
      } else {
        alert('Error while deleting post');
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
}


function showUserName(name){
  document.getElementById('userName').innerHTML = "Hello " + name +"!";
}

//James code ENDS

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
