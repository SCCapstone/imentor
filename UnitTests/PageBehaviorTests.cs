using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using OpenQA.Selenium;
using OpenQA.Selenium.Chrome;
using OpenQA.Selenium.Support.UI;


namespace UnitTests
{
    [TestClass]

    public class PageBehaviorTests
    {
        [TestMethod]

        public void HomepageLoads_CalendarIsReachable()
        {
            // Instantiate a new web driver to run the test
             IWebDriver driver = new ChromeDriver();

            // Trying to work around specifying a path that only works on my local machine
            // IWebDriver driver = new ChromeDriver(@".\bin\Debug");

            // Instruct the driver to throw an error if it has to wait more than 5 seconds for retrieval, then go to URL
            driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(5));
            driver.Navigate().GoToUrl("https://imast.azurewebsites.net");

            // To verify that the homepage is online and reachable, we save the url after navigating and check it
            String HomeUrl = driver.Url;
            Assert.AreEqual("https://imast.azurewebsites.net/#!/", HomeUrl);

            // Our home page is the Listings page. Test that it has loaded by comparing the title element to "Listings"
            String PrimaryHeader = driver.FindElement(By.ClassName("panel-title")).Text;
            Assert.AreEqual("Listings", PrimaryHeader);

            // Our home page also has a collection of filters. Test that they have loaded by checking their text tags.
            // Retrieve the concatenated raw text and initialize placeholder variables.
            String tempString = "";
            int shift = 0;
            String FilterHeader = driver.FindElement(By.ClassName("panel-body")).Text;

            // Each text tag is a substring in the concatenated text. Retrieve each substring.
            String FilterTitle = FilterHeader.Substring(shift, "Subjects".Length);
            tempString = FilterTitle;
            shift = shift + tempString.Length + 2;

            String FilterMath = FilterHeader.Substring(shift, "Math".Length);
            tempString = FilterMath;
            shift = shift + tempString.Length + 2;

            String FilterScience = FilterHeader.Substring(shift, "Science".Length);
            tempString = FilterScience;
            shift = shift + tempString.Length + 2;

            String FilterHistory = FilterHeader.Substring(shift, "History".Length);
            tempString = FilterHistory;
            shift = shift + tempString.Length + 2;

            String FilterReading = FilterHeader.Substring(shift, "Reading".Length);
            tempString = FilterReading;
            shift = shift + tempString.Length + 2;

            String FilterCompSci = FilterHeader.Substring(shift, "Computer Science".Length);
            tempString = FilterCompSci;
            shift = shift + tempString.Length + 2;

            // Assert that all the text tags are correct.
            Assert.AreEqual("Subjects", FilterTitle);
            Assert.AreEqual("Math", FilterMath);
            Assert.AreEqual("Science", FilterScience);
            Assert.AreEqual("History", FilterHistory);
            Assert.AreEqual("Reading", FilterReading);
            Assert.AreEqual("Computer Science", FilterCompSci);

            // Next we find the Calendar Button and click it to navigate to the Calendar
            IWebElement CalendarButton = driver.FindElement(By.ClassName("glyphicon-calendar"));
            CalendarButton.Click();

            // To verify that the calendar loaded, we check the "today button"
            String Today = driver.FindElement(By.ClassName("fc-today-button")).Text;
            Assert.AreEqual("today", Today);
            
            // End the test by closing the browser
            driver.Close();
        }


    }
}
