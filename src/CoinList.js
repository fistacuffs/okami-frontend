import React from 'react';
import http from 'http';

function getCoinList(callback) {

    return http.get({
        host: 'localhost:8080?action=coinlist',
        path: ''
    }, function(response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function(d) {
            body += d;
        });
        response.on('end', function() {

            // Data reception is done, do whatever with it!
            return (
              <ul>
                body.forEach(item => <li>item</li>)
              </ul>
            );
        });
    });
}

export default getCoinList;
