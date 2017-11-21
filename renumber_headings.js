/**
 * @OnlyCurrentDoc
 */

function onOpen() {
  DocumentApp.getUi()
             .createAddonMenu()
             .addItem('Renumber', 'renumberHeadings')
             .addToUi()
}

function renumberHeadings () {
  var counter = [0, 0, 0, 0, 0, 0]
  var pt = DocumentApp.ParagraphHeading
  var ph = [pt.HEADING1, pt.HEADING2, pt.HEADING3, pt.HEADING4, pt.HEADING5, pt.HEADING6]
  DocumentApp.getActiveDocument().getBody().getParagraphs().forEach(function(par) {
    // is the current paragraph's style a heading?
    thisHeading = ph.indexOf(par.getHeading())
    // process numbering, if so
    if(thisHeading > -1) {
      // increase the current heading
      counter[thisHeading]++
      // reset all following to zero
      for (var i = thisHeading+1; i < counter.length; i++) counter[i] = 0
      // isolate the title text, discard numbering if present
      var title = par.getText().split('\t').pop()
      // generate counter string
      var count = counter.slice(0, thisHeading+1).join('.')
      // replace the current paragraph with computed text
      par.setText(count + '\t' + title)
    }
  })
}
