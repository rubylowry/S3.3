
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












//Natalia's code

function renderCardHomePage(){
    document.getElementById('communityPhotos').innerHTML = `<div class="col-md-4">
    <div class="card cardSkin mb-4">
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

// =========  code from James start

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
    // console.log(url);
  },//success
  error:function(){
    console.log('error: cannot call api');
  }//error
});//ajax

$(document).ready(function(){
  // console.log("js is working");

  // stuff needed:

  // View User --  done
  // Add User -- done
  // Delete User -- im an idiot and don't know how to do it
  // Update User - don't need / im an idiot and don't know how to do it

  // Login User -- done
  // Logout User -- done

  // View All Posts --
  // View A Specific Post --
  // Add Post -- done
  // Delete Post -- done
  // Update Post -- done




  if (sessionStorage['userName']) {
    console.log('You are logged in');
    showUserName(sessionStorage.userName);
  } else {
    console.log('Please login');
  }

  //logout button
  $('#logoutBtn').click(function(){
    sessionStorage.clear();
    // console.log(sessionStorage);
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
  $('#getPosts').click(function(){
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


  // Add Post
  $('#postAddBtn').click(function(){
    let username = sessionStorage.userName;
    let description = $('#description').val();
    let imageURL= $('#imageurl').val();
    $.ajax({
      url :`${url}/addPost`,
      type :'POST',
      data:{
        username :username,
        description : description,
        imageURL: image,
        userId : sessionStorage.getPost('userId')
      },
      success : function(loginData){
        console.log(loginData);
      },//success
      error:function(){
        console.log('error: cannot call api');
      }//error
    });//ajax
  });
});

// Update Post
$('#postUpdateBtn').click(function(){
  console.log('button pressed');
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
      userId : userId,
      description : postDescription,
      imageURL: postImage
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

$('#postDeleteBtn').on('click',function(){
  // event.preventDefault();
  let postId = $('#deletePostId').val();
  console.log(postId);
    $.ajax({
    url :`${url}/deletePost/${postId}`,
    type :'DELETE',
    success : function(data){
      console.log(data);
      if (data=='deleted'){
        alert('deleted');
      } else {
        alert('Error while deleting post');
      }
    },//success
    error:function(){
      console.log('error: cannot call api');
    }//error
  });//ajax
});


function showUserName(name){
  document.getElementById('userName').innerHTML = "Hello " + name +"!";
}


// code from James end here
