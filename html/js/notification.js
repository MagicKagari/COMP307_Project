//function for notification of server update
// Determine the correct object to use
var notification = window.Notification || window.mozNotification || window.webkitNotification;

// The user needs to allow this
if('undefined' === typeof notification){
  alert('Web notification not supported');
}else{
  notification.requestPermission(function(permission){});
}

//Poll our backend for notifications, set some reasonable timeout for your application

window.setInterval(function() {
  if(localStorage.isLoggedIn){
    $.ajax({
      url:"http://159.203.18.55:1337/node/gifts/checkGift",
      //url:"http://localhost:1337/node/gifts/checkGift",
      type:"POST",
      data: JSON.stringify({'userid':localStorage.userID}),
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(msg) {
        if(msg.result){
            for(var i=0; i<msg.info.length;i++){
              Notifier.info("New gift for you", "User: " + msg.info[i].fromWhoName + " GiftID: " + msg.info[i].giftID);
            }
        }
      },
      error: function(error){
        console.log(JSON.stringify(error));
      }
    });
  }else return;
}, 5000);    //poll every 5 secs.

/***********************
* Notifier.js - Developed by rlemon (rob.lemon@gmail.com) https://github.com/rlemon/Notifier.js
* Licensed under GNU GPL V3 https://github.com/rlemon/Notifier.js/blob/master/LICENSE
***********************/
var Notifier = (function() {
    var apply_styles = function(element, style_object) {
        for (var prop in style_object) {
            element.style[prop] = style_object[prop];
        }
    };
    var fade_out = function(element) {
        if (element.style.opacity && element.style.opacity > 0.05) {
            element.style.opacity = element.style.opacity - 0.05;
        } else if (element.style.opacity && element.style.opacity <= 0.1) {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        } else {
            element.style.opacity = 0.9;
        }
        setTimeout(function() {
            fade_out.apply(this, [element]);
        }, 1000 / 30);
    };
    var config = { /* How long the notification stays visible */
        default_timeout: 5000,
        /* container for the notifications */
        container: document.createElement('div'),
        /* container styles for notifications */
        container_styles: {
            position: "fixed",
            zIndex: 99999,
            right: "12px",
            top: "12px"
        },
        /* individual notification box styles */
        box_styles: {
            cursor: "pointer",
            padding: "12px 18px",
            margin: "0 0 6px 0",
            backgroundColor: "white",
            opacity: 0.8,
            color: "rgb(21,164,160)",
            font: "normal 13px 'Lucida Sans Unicode', 'Lucida Grande', Verdana, Arial, Helvetica, sans-serif",
            borderRadius: "10px",
            boxShadow: "rgb(31,230,230) 0 0 4px",
            width: "300px"
        },
        /* individual notification box hover styles */
        box_styles_hover: {
            opacity: 1,
            boxShadow: "#000 0 0 12px"
        },
        /* notification title text styles */
        title_styles: {
            fontWeight: "700"
        },
        /* notification body text styles */
        text_styles: {
            display: "inline-block",
            verticalAlign: "middle",
            width: "240px",
            padding: "0 12px"
        },
        /* notification icon styles */
        icon_styles: {
            display: "inline-block",
            verticalAlign: "middle",
            height: "36px",
            width: "36px"
        }
    };
    apply_styles(config.container, config.container_styles);
    document.body.appendChild(config.container);
    return {
        notify: function(message, title) {

            var notification = document.createElement('div');
            apply_styles(notification, config.box_styles);

            notification.onmouseover = function() {
                apply_styles(this, config.box_styles_hover);
            };
            notification.onmouseout = function() {
                apply_styles(this, config.box_styles);
            };
            notification.onclick = function() {
                this.style.display = 'none';
            };

            var text = document.createElement('div');
            apply_styles(text, config.text_styles);

            notification.appendChild(text);

            if (title) {
                var title_text = document.createElement('div');
                apply_styles(title_text, config.title_styles);
                title_text.appendChild(document.createTextNode(title));
                text.appendChild(title_text);
            }

            if (message) {
                var message_text = document.createElement('div');
                message_text.appendChild(document.createTextNode(message));
                text.appendChild(message_text);
            }

            config.container.insertBefore(notification, config.container.firstChild);

            setTimeout(function() {
                fade_out(notification);
            }, config.default_timeout);
        },
        info: function(message, title) {
            this.notify(message, title);
        },
        warning: function(message, title) {
            this.notify(message, title);},
        success: function(message, title) {
            this.notify(message, title);},
        error: function(message, title) {
            this.notify(message, title);}
    };
}());
