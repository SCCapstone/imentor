
app.factory('urlService', function ()
{
    var returnPath = null;

    return {
        setReturnPath: function (retPath)
        {
            returnPath = retPath;
        },

        getReturnPath: function ()
        {
            if (avIsDefined(returnPath))
                return returnPath;
            return '/';
        },

        clear: function () {
            returnPath = null;
        }
    };
});