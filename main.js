$(document).ready(function () {
  var listOfPictures = [];
  var listOfText = [];
  var currentData = 0;
  var firstCall = true;

  start();
  loadNewData(5);
  loadNewData(15);

  $(".next-button").click(function () {
    setNextData();
  });

  function loadNewText() {
    $(".home-text p").html('" Carregando uma frase super legal... "');
    $.ajax({
      url: "https://www.boredapi.com/api/activity",
      dataType: "json",
      type: "GET",
      success: function (json) {
        $(".home-text p").html('" ' + json.activity + ' "');
        listOfText.push(json.activity);
      },
      error: function (json) {
        console.error("Erro ao carregar o texto");
      }
    });
  }

  function loadNewPicture() {
    $.ajax({
      url: "https://thatcopy.pw/catapi/rest/",
      dataType: "json",
      type: "GET",
      success: function (json) {
        listOfPictures.push(json.url);
        setNextData();
      },
      error: function (json) {
        console.error("Erro ao carregar a imagem");
      }
    });
  }

  function setNextData() {
    currentData++;
    let cacheIndex = currentData + 1;

    console.log(listOfPictures[currentData]);
    console.log(listOfText[currentData]);

    $(".body").css("background", "url('" + listOfPictures[currentData] + "')");
    $(".home-text p").html('" ' + listOfText[currentData] + ' "');
  }

  function getNewPicture(limit = 1) {
    let count = 0;
    while (count < limit) {
      count++;
      $.ajax({
        url: "https://thatcopy.pw/catapi/rest/",
        dataType: "json",
        type: "GET",
        success: function (json) {
          listOfPictures.push(json.url);
        },
        error: function (json) {
          console.error("Erro ao carregar a imagem");
        }
      });
    }

    let stringUrl = "";
    listOfPictures.forEach(function (element, index, array) {
      stringUrl = stringUrl + element;
      console.log("LISTA", element.activity);
    });
  }

  function getNewText(limit = 1) {
    let count = 0;
    while (count < limit) {
      count++;
      $.ajax({
        url: "https://www.boredapi.com/api/activity",
        dataType: "json",
        type: "GET",
        success: function (json) {
          console.log(json);
          listOfText.push(json.activity);
        },
        error: function (json) {
          console.error("Erro ao carregar o texto");
        }
      });
    }
  }

  function loadNewData(limit = 1) {
    appendNewItens();
    getNewText(limit);
    getNewPicture(limit);
  }

  function start() {
    let text;
    $.ajax({
      url: "https://www.boredapi.com/api/activity",
      dataType: "json",
      type: "GET",
      success: function (json) {
        console.log(json);
        text = json.activity;
        listOfText.push(json.activity);
        $.ajax({
          url: "https://thatcopy.pw/catapi/rest/",
          dataType: "json",
          type: "GET",
          success: function (json) {
            text = json.activity;
            $(".home-text p").html('" ' + text + ' "');
            $(".body").css("background", "url('" + json.url + "')");
            listOfPictures.push(json.url);
            setNextData();
          },
          error: function (json) {
            console.error("Erro ao carregar a imagem");
          }
        });
      },
      error: function (json) {
        console.error("Erro ao carregar o texto");
      }
    });
  }

  function appendNewItens(count = 1) {
    var base = $("#base");
    console.log(base);
    $("#body").append(base);
  }
});
