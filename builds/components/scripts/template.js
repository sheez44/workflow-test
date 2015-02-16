$(function() {
  var Mustache = require('mustache'); // for browserify
 
  $.getJSON('js/data.json', function(data) {
    var template = $('#speakerstpl').html();
    var html = Mustache.to_html(template, data);
    $('#speakers').html(html);    
  }); //getJSON
  
}); //function