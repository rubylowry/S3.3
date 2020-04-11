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