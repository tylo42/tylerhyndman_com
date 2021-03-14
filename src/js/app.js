'use strict';
(async function () {  
    try {
      const data = await getData();

      document.title = data.name;
      document.getElementById('name').innerText = data.name;
      document.getElementById('profile').innerHTML = buildProfileImage(data.profileImage)
      document.getElementById('waypointTitle').innerText = data.waypointTitle;
      document.getElementById('waypoints').innerHTML = data.waypoints.map(buildWaypoint).join('\n');
      document.getElementById('footer').innerHTML = buildFlair(data.flair);

      document.getElementById("jumbotronHead").style.background = `url('${data.headImage}')`
      document.getElementById("jumbotronHead").style.backgroundRepeat = "no-repeat"
      document.getElementById("jumbotronHead").style.backgroundAttachment = "fixed"
      document.getElementById("jumbotronHead").style.backgroundSize = "cover"

    } catch (error) {
      console.log(error);
      let errorRow = document.getElementById('error')
      
      errorRow.innerHTML = `<div class="col"><p>${error}</p></div>`;
      errorRow.classList.remove("collapse")
    }

    async function getData() {
      const response = await axios.get('https://api.tylerhyndman.com/data')

      if(response.status !== 200) {
        throw new Error("Unable to retrieve data");
      }

      return response.data;
    }

    function buildProfileImage(profileImage) {
      return `<img class="rounded-circle img-fluid profile" src="${profileImage}" alt=""></img>`
    }

    function buildWaypoint(waypoint) {
      const details = waypoint.details.map(detail => {
          return `<p>${detail}</p>`
      }).join('\n');

      return `

          <div class="col-md-6 text-md-right">
              <h3><a href="${waypoint.link}">${waypoint.title}</a></h3>
              <p>
                  <b>${waypoint.role}</b>, ${waypoint.when}<br />
                  ${waypoint.location}
              </p>
          </div>
          <div class="col-md-4">
              ${details}
          </div>
          <div class="col-md-2">
          </div>`;
    }

    function buildFlair(flair) {

      return flair.map(f => {
        return `
          <div class="col text-center p-1">
            <a href=${f.link}>
              <img class="flair" src="${f.image}"></img>
            </a>
          </div>

        `
      }).join('\n');
    }
  })()
  