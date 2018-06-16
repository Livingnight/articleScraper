// const request = require('request');
$(document).ready(() => {

    const postScrapeData = () => {
        console.log('function triggered');
        $.get('/api/scrape').then( data => {
            console.log(data);
            console.log('get route worked');
            window.location.href = '/';
        });
    };
    const saveArticle = articleId => {
          $.ajax({
              url: `/api/article:${articleId}`,
              method: "PUT",
              data: `saved:true`
          }).then( data => {
              console.log(data);
          }).catch(err => {
              console.error(err);
          })
    };

    $(document).on('click', () => {
        console.log('working?');
    });
    $(document).on('click', '.scrape', e => {
        console.log('button working');
        e.preventDefault();
        postScrapeData();
    });
    $(document).on('click', '.save-btn', function(e) {
        const _id = $(this).parent().parent().parent().attr('data-id');
        console.log(_id);
        saveArticle(_id);
    });


});

