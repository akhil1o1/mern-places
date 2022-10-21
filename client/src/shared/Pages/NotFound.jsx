import React from "react";
import { Link } from "react-router-dom";

import Card from "../components/UIElements/Card";

function NotFound() {
    return <Card>
        <div className="center">
            <h1>
                404!!!!
            </h1>
            <h2>
                Not Found
            </h2>
            <p>The page you are trying to react doesn't exist.</p>
        </div>
        <Link to={"/"}> Go to home page. </Link>
    </Card>
}

export default NotFound