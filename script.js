var clickbut = document.querySelector("#app form button");
var zipCodeUser = document.querySelector("#app form input");
var content = document.querySelector("#app main");

clickbut.addEventListener("click", run);

function createLine(text) {
  var line = document.createElement("p");
  var text = document.createTextNode(text);
  line.appendChild(text);
  content.appendChild(line);
}

function run(event) {
  event.preventDefault();
  var zipCode = zipCodeUser.value;
  axios
    .get("https://viacep.com.br/ws/" + zipCode + "/json/")
    .then(function (response) {
      if (response.data.erro) {
        throw new Error("Verifique o CEP e tente novamente!");
      }

      content.innerHTML = "";
      createLine(response.data.logradouro);
      createLine(response.data.localidade + "/" + response.data.uf);
      createLine(response.data.bairro);
      createLine("DDD: " + response.data.ddd);
    })
    .catch(function (error) {
      content.innerHTML = "";
      console.log(error);
      createLine("Verifique o CEP e tente novamente!");
    });
}
