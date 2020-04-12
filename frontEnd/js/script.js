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