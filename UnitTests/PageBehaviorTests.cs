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

            //Implicit Path (Default)
            IWebDriver driver = new ChromeDriver();

            //Explicit Path
            //IWebDriver driver = new ChromeDriver("\\\\psf\\Home\\Documents\\GitHubVisualStudio\\imentor\\UnitTests\\");

            // Instruct the driver to throw an error if it has to wait more than 5 seconds for retrieval, then go to URL
            driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(5));
            driver.Navigate().GoToUrl("https://imast.azurewebsites.net");

            // To verify that the homepage is online and reachable, we save the url after navigating and check it
            String HomeUrl = driver.Url;
            Assert.AreEqual("https://imast.azurewebsites.net/#!/", HomeUrl);

            // Our home page is the Listings page. Test that it has loaded by comparing the title element to "Listings"
            String PrimaryHeader = driver.FindElement(By.ClassName("im-form-label")).Text;
            Assert.AreEqual("Upcoming Events", PrimaryHeader);

            // Our home page also has a collection of filters. Test that they have loaded by checking their text tags.

            String FilterHeader = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[1]/div")).Text;
            String FilterMath = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[2]/div/div[1]")).Text;
            String FilterScience = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[3]/div/div")).Text;
            String FilterHistory = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[4]/div/div")).Text;
            String FilterReading = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[5]/div/div")).Text;
            String FilterCompSci = driver.FindElement(By.XPath("//*[@id=\"main-content\"]/div/div/div/div/div[4]/div[1]/div/div[2]/div[2]/md-content/md-list/md-list-item[6]/div/div")).Text;

            // Assert that all the text tags are correct.
            Assert.AreEqual("Subjects", FilterHeader);
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

            // Also verify the other calendar buttons, month, week, and day.
            String Month = driver.FindElement(By.ClassName("fc-month-button")).Text;
            Assert.AreEqual("month", Month);

            String Week = driver.FindElement(By.ClassName("fc-basicWeek-button")).Text;
            Assert.AreEqual("week", Week);

            String Day = driver.FindElement(By.ClassName("fc-basicDay-button")).Text;
            Assert.AreEqual("day", Day);
            
            // End the test by closing the browser
            driver.Close();
        }

        [TestMethod]

        public void HomepageLoads_ManageUsersIsReachable()
        {
            // Instantiate a new web driver to run the test

            //Implicit Path (Default)
            IWebDriver driver = new ChromeDriver();

            //Explicit Path
            //IWebDriver driver = new ChromeDriver("\\\\psf\\Home\\Documents\\GitHubVisualStudio\\imentor\\UnitTests\\");

            // Instruct the driver to throw an error if it has to wait more than 5 seconds for retrieval, then go to URL
            driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(5));
            driver.Navigate().GoToUrl("https://imast.azurewebsites.net");

            // To verify that the homepage is online and reachable, we save the url after navigating and check it
            String HomeUrl = driver.Url;
            Assert.AreEqual("https://imast.azurewebsites.net/#!/", HomeUrl);

            // Then we need to toggle the Manage Dropdown Menu.
            IWebElement ManageDropDown = driver.FindElement(By.ClassName("dropdown-toggle"));
            ManageDropDown.Click();

            // Next we find the Users Button inside the Manage Dropdown Menu and click it to navigate to the User Management Table
            IWebElement ManageUsersButton = driver.FindElement(By.ClassName("glyphicon-user"));
            ManageUsersButton.Click();

            // Also check the refresh button. A user should be able to click it.
            IWebElement RefreshTable = driver.FindElement(By.ClassName("glyphicon-refresh"));
            RefreshTable.Click();

            // The table itself has 4 attributes. We check that the User Name Header has loaded.
            String UserName = driver.FindElement(By.ClassName("ui-grid-header-cell-label")).Text;
            Assert.AreEqual("User Name", UserName);

            // End the test by closing the browser.
            driver.Close();

        }

        [TestMethod]

        public void HomepageLoads_ManageListingsIsReachable()
        {
            // Instantiate a new web driver to run the test

            //Implicit Path (Default)
            IWebDriver driver = new ChromeDriver();

            //Explicit Path
            //IWebDriver driver = new ChromeDriver("\\\\psf\\Home\\Documents\\GitHubVisualStudio\\imentor\\UnitTests\\");

            // Instruct the driver to throw an error if it has to wait more than 5 seconds for retrieval, then go to URL
            driver.Manage().Timeouts().ImplicitlyWait(TimeSpan.FromSeconds(5));
            driver.Navigate().GoToUrl("https://imast.azurewebsites.net");

            // To verify that the homepage is online and reachable, we save the url after navigating and check it
            String HomeUrl = driver.Url;
            Assert.AreEqual("https://imast.azurewebsites.net/#!/", HomeUrl);

            // Then we need to toggle the Manage Dropdown Menu.
            IWebElement ManageDropDown = driver.FindElement(By.ClassName("dropdown-toggle"));
            ManageDropDown.Click();

            // Next we find the Listings Button inside the Manage Dropdown Menu and click it to navigate to the Listing Management Table
            IWebElement ManageUsersButton = driver.FindElement(By.ClassName("glyphicon-th-list"));
            ManageUsersButton.Click();

            // To verify that the User Management Table loaded, we check the Header.
            String ListingManagement = driver.FindElement(By.ClassName("header-title")).Text;
            Assert.AreEqual("Listing Management", ListingManagement);

            // Also while we're here, check the login button (which is accessible anywhere).
            IWebElement LogIn = driver.FindElement(By.XPath("//*[@id=\"loginLink\"]"));
            LogIn.Click();

            // To verify that the login page is up, check the Google Button.
            String Google = driver.FindElement(By.ClassName("btn")).Text;
            Assert.AreEqual("Google", Google);

            // End the test by closing the browser
            driver.Close();
        }

    }
}
