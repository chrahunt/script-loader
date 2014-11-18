# Script Loader
> Inject scripts at will.

Script loader takes one input, the URL of the file that serves as the [data-main](http://requirejs.org/docs/api.html#data-main) script for RequireJS.

In its current form, the extension carries out this script injection when a TagPro game is active.

It's necessary to ensure that the server returns the header Access-Control-Allow-Origin:*, otherwise the extension will now work. This applies to the response to the URL provided to the extension, as well as to the URLs that are passed back to the extension.
