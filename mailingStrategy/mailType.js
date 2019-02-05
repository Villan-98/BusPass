const mail = require("./usingMailgun");
const sendMail = function(type, emailId) {
  /* Type value will decide which type of mail will be send
        type1 :- for the confirmation of registration
        type=2 :- for rejection of application by transport head
        type=3 :- for the rejectionn of application by depot Manager
        type=4 :- for acceptance of application at all levels
     */
  var text;
  if (type === 1) {
    text =
      "We are pleased to inform you that your application for the issuance of bus-pass is registered." +
      " You may check your application's status at 'domainName/application/status";
  } else if (type === 2) {
    text =
      "We are sorry to inform you that your application for the bus-pass is rejected by the transport head of your college\n" +
      "Your paid amount will be refunded back in 15 working days\n" +
      "You may contact to your college's admin for any query( reason for the rejection of application)\n";
  } else if (type === 3) {
    text =
      "We are sorry to inform you that your application for the bus-pass is rejected by the Depot-Manager\n" +
      "Your paid amount will be refunded back in 15 working days\n" +
      "You may contact to your concern depot for any query( reason for the rejection of application)\n";
  } else {
    text =
      "We are pleased to inform you that your application for bus-Pass is accpeted at all levels of verification." +
      "You may collect your bus-pass from the concern bus depot\n" +
      "It is mandatory to bring collegeId and registration form of bus-pass for the collection of the same\n";
  }
  text =
    text +
    "Thank You\n" +
    "\n" +
    "With Regards\n" +
    "Pass Section\n" +
    "\n" +
    "This is a system generated mail. Please do not reply to the same!";
  mail.doMail({ text: text, emailId: emailId });
};
module.exports = sendMail;
