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
             IWebDriver driver = new ChromeDriver(@"C:\Users\Mike\Downloads");

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
