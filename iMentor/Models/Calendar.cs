using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Google.GData.Calendar;
using Google.GData.Extensions;
using Google.GData.AccessControl;
using Google.GData.Client;

public partial class _Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
    }
    public class Calendar
    {
         
        public DateTime dt { get; set; }
        public string tle { get; set; }
    }
    public class GCalendar
    {
        private const string CAL_URL =
    "https://www.Google.com/calendar/feeds/default/owncalendars/full";
        private const string CAL_TEMPLATE =
    "https://www.Google.com/calendar/feeds/{0}/private/full";
        private string g_CalUrl = null;
        private string g_CalId = null;
        private readonly CalendarService g_calService = null;
        private readonly string g_CalendarName;
        private readonly string g_UserName;
        private readonly string g_Password;
        public GCalendar(string cal_Name, string user_name, string user_password)
        {
            g_CalendarName = cal_Name;
            g_UserName = user_name;
            g_Password = user_password;
            g_calService = new CalendarService("Calendar");
        }
        public Calendar[] GetEvents()
        {
            try
            {
                if (google_authentication())
                {
                    EventQuery qry = new EventQuery(g_CalUrl);
                    EventFeed fd = g_calService.Query(qry);
                    return (from EventEntry entry in fd.Entries
                            select new Calendar()
                            {
                                dt = entry.Times[0].StartTime,
                                tle = entry.Title.Text
                            }).ToArray();
                }
                else
                {
                    return new Calendar[0];
                }
            }
            catch (Exception)
            {
                return new Calendar[0];
            }
        }
        private bool google_authentication()
        {
            g_calService.setUserCredentials(g_UserName, g_Password);
            return SaveCalIdAndUrl();
        }
        private bool SaveCalIdAndUrl()
        {
            CalendarQuery qry = new CalendarQuery();
            qry.Uri = new Uri(CAL_URL);
            CalendarFeed resultFeed = (CalendarFeed)g_calService.Query(qry);
            foreach (CalendarEntry entry in resultFeed.Entries)
            {
                if (entry.Title.Text == g_CalendarName)
                {
                    g_CalId = entry.Id.AbsoluteUri.Substring(63);
                    g_CalUrl = string.Format(CAL_TEMPLATE, g_CalId);
                    return true;
                }
            }
            return false;
        }
        public string CalId()
        {
            return g_CalId;
        }
    }
    public string CalId()
    {
        GCalendar cal = new GCalendar
       ("Google calendar name", "Google account name", "Google account password");
        return cal.CalId();
    }
}
