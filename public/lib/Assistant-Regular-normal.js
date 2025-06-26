// Simulated jsPDF font file for Assistant-Regular
jsPDF.API.events.push(['addFonts', function() {
  this.addFileToVFS('Assistant-Regular.ttf', '<base64-encoded-font>');
  this.addFont('Assistant-Regular.ttf', 'Assistant-Regular', 'normal');
}]);
