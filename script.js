const TOOLTIP_VALUES = ["📋 CLICK to copy comment<br /><br />❌ (CTRL-CLICK to remove)", "📋 COPIED!", "❌ REMOVED!"];
const FLASH_TIME = 500;

function flash_tooltip(which) {
    var tooltipSpan = document.getElementById('tooltip-span');
    tooltipSpan.innerHTML = TOOLTIP_VALUES[which];
    tooltipSpan.classList.add('yellow');
    setTimeout(function() {
        tooltipSpan.innerHTML = TOOLTIP_VALUES[0];
        tooltipSpan.classList.remove('yellow');
        }, FLASH_TIME
    );                
}

function copyText(e) {
    if (e.ctrlKey) {
        flash_tooltip(2);
        setTimeout(function () { e.target.remove(); }, FLASH_TIME);
        return;
    }
    navigator.clipboard.writeText(e.target.innerHTML);
    flash_tooltip(1);
}

function addComment()
{
    var comment_editor = document.getElementById("comment-editor");
    if (!comment_editor.value) {
        alert("Please type a comment");
        return;
    }                
    var new_comment = document.createElement("div");
    new_comment.className = "comment-box clickable dotted wrapped";
    new_comment.appendChild(document.createTextNode(comment_editor.value));
    new_comment.addEventListener("click", copyText);
    document.getElementById("comment-container").appendChild(new_comment);
    comment_editor.value = "";
}

window.onload = function() {
    var addCommentBtn = document.querySelector("#add-comment");
    addCommentBtn.addEventListener('click', addComment);

    var comment_editor = document.getElementById("comment-editor");
    comment_editor.focus();
    comment_editor.addEventListener('blur', function(e) {
        comment_editor.focus();
    });
    comment_editor.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.keyCode === 13 || e.keyCode === 10)) {
            addCommentBtn.click();
        }
    });


    document.querySelector("#clear-comments").addEventListener('click', function() {
        location.reload();
    });

    var tooltipSpan = document.getElementById('tooltip-span');
    tooltipSpan.innerHTML = TOOLTIP_VALUES[0];
    window.onmousemove = function (e) {
        tooltipSpan.style.left = (e.pageX + 15) + 'px';
        tooltipSpan.style.top = (e.pageY + 15) + 'px';
    };
};