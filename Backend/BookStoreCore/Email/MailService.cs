using System;
using System.Net;
using System.Net.Mail;

namespace BookStoreCore.Email
{
    public class MailService : IMailService
    {
        public bool SendMailAsync(string SendMailTo, string SendMailSubject, string SendMailBody)
        {
<<<<<<< Updated upstream
            String SendMailFrom = "binhcid34@gmail.com";
=======
<<<<<<< HEAD
            String SendMailFrom = "duckienkien11@gmail.com";
=======
            String SendMailFrom = "binhcid34@gmail.com";
>>>>>>> 3de0db7d8f96c0b7e40be265b27f507a8c8d46c9
>>>>>>> Stashed changes
            try
            {
                SmtpClient SmtpServer = new SmtpClient("smtp.gmail.com", 587);
                SmtpServer.DeliveryMethod = SmtpDeliveryMethod.Network;
                MailMessage email = new MailMessage();
                // START
                email.From = new MailAddress(SendMailFrom);
                email.To.Add(SendMailTo);
                email.CC.Add(SendMailFrom);
                email.Subject = SendMailSubject;
                email.Body = SendMailBody;
                //END
                SmtpServer.Timeout = 5000;
                SmtpServer.EnableSsl = true;
                SmtpServer.UseDefaultCredentials = false;
<<<<<<< Updated upstream
                SmtpServer.Credentials = new NetworkCredential(SendMailFrom, "dnlcxlvzkzmkmmft");
=======
<<<<<<< HEAD
                SmtpServer.Credentials = new NetworkCredential(SendMailFrom, "guvyfgdhmjnmggkq");
=======
                SmtpServer.Credentials = new NetworkCredential(SendMailFrom, "dnlcxlvzkzmkmmft");
>>>>>>> 3de0db7d8f96c0b7e40be265b27f507a8c8d46c9
>>>>>>> Stashed changes
                SmtpServer.Send(email);
                //Console.WriteLine("Email Successfully Sent");
                //Console.ReadKey();
                return true;
            }
            catch (Exception ex)
            {
                //Console.WriteLine(ex.ToString());
                //Console.ReadKey();
                return false;
            }
        }
    }
}
