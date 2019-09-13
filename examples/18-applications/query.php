<?php
header("Content-type: application/xml");

print(file_get_contents("retrieve_data_xmlhttprequest_data.xml"));

return true;
?>