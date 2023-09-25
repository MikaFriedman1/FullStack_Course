const url = new URL(location.href);
const movieID = url.searchParams.get("id");
const movieTitle = url.searchParams.get("title");   
document.getElementById("title").innerHTML = `<h3>${movieTitle}</h3>`;

const APILINK = "http://localhost:8000/api/v1/reviews/"; 

const options = {
  method: 'GET',
  // headers: {
  //   accept: 'application/json',
  //   Authorization: `Bearer ${API_KEY}`
  // }
};

const main = document.getElementById("section");

const div_new = document.createElement('div');
div_new.innerHTML = `
  <div class="row">
    <div class="column">
      <div class="card">
        New Review
        <p>
          <label for="new_review"><strong>Review:</strong></label>
          <input type="text" id="new_review" value="">
        </p>
        <p>
          <label for="new_user"><strong>User:</strong></label>
          <input type="text" id="new_user" value="">
        </p>
        <p>
          <a href="#" onclick="saveReview('new_review', 'new_user')">
            <i class="fas fa-save"></i> Save
          </a>
        </p>
      </div>
    </div>
  </div>
`;

returnReviews(APILINK, options)

function returnReviews(url, options) {
  fetch(url + "movie/" + movieID, options)
    .then(res => res.json())
    .then(function(data) {
      console.log(data);
      data.forEach(review => {
        if (review) {
          const div_card = document.createElement('div');
          div_card.classList.add('row');

          const cardContent = document.createElement('div');
          cardContent.classList.add('column');
          cardContent.innerHTML = `
            <div class="card" id="${review._id}">
              <p><strong>Review:</strong> ${review.review}</p>
              <p><strong>User:</strong> ${review.user}</p>
              <p>
                <i  onclick="editReview('${review._id}', '${review.review}', '${review.user}')">edit</i>
              </p>
              <p>
                <i onclick="deleteReview('${review._id}')">delete</i>
              </p>
            </div>
          `;

          div_card.appendChild(cardContent);
          main.appendChild(div_card);
        }
      });
    });
}

function editReview(id, review, user) {
    const element = document.getElementById(id);    
    console.log(element)
    const reviewInputID = "review" + id;    
    const userInputID = "user" + id;
    
    element.innerHTML = `
    <p><strong>Review:</strong>
      <input type="text" id="${reviewInputID}" value="${review}">
    </p>
    <p><strong>User:</strong>
      <input type="text" id="${userInputID}" value="${user}">
    </p>
    <p>
      <a href="#" onclick="saveReview('${reviewInputID}', '${userInputID}', '${id}')">
        <i class="fas fa-save"></i> Save
      </a>
    </p>
  `;

  main.appendChild(div_new);
  
}

function saveReview(reviewInputId, userInputId, id="") {
    const review = document.getElementById(reviewInputId).value;
    const user = document.getElementById(userInputId).value;

    console.log(review, user, id);

    if (id) {
        fetch(APILINK + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user": user, "review": review})
        }).then(res => res.json())
          .then(res => {
            console.log(res)
            location.reload();
        });
    } else {
        fetch(APILINK + "new", {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"user": user, "review": review, "movieId": movieID})
        }).then(res => res.json())
            .then(res => {
                console.log(res)
                location.reload();
            });

        }
    }
 
function deleteReview(id) { 
  fetch(APILINK + id, {
    method: 'DELETE',
  }).then(res => res.json())
    .then(res => {
      console.log(res)
      location.reload();
    });
}