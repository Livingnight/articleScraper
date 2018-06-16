// const request = require('request');
$(document).ready(() => {

    const postScrapeData = () => {
        console.log('function triggered');
        $.get('/api/scrape').then(data => {
            console.log(data);
            console.log('get route worked');
            window.location.href = '/';
        });
    };
    const toggleSaveArticle = articleId => {
        $.ajax({
            url: `/api/article/${articleId}`,
            method: "PUT",
            data: {saved: true}
        }).then(data => {
            console.log(data);
            window.location.href = '/';
        }).catch(err => {
            console.error(err);
        })
    };
    const toggleDeleteArticle = articleId => {
        $.ajax({
            url: `/api/article/${articleId}`,
            method: "PUT",
            data: {saved: false}
        }).then(data => {
            console.log(data);
            window.location.href = '/saved';
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
    $(document).on('click', '.save-btn', function (e) {
        const id = $(this).attr('data-id');
        toggleSaveArticle(id);
    });
    $(document).on('click', '.del-btn', function () {
        const id = $(this).attr('data-id');
        toggleDeleteArticle(id);

    });
    $(document).on('click', '.note-btn', function (e) {
        const id = $(this).attr('data-id');
        $.ajax({
            url: '/api/notes',
            method: 'GET',
            data: {_id: id}
        }).then(notes => {
            console.log(notes);
            notes.forEach(note => {
                $('.saved-notes')
                    .append(
                        `<p id="${note}">${note}</p>`
                    );

            })
        });
        $('#note-modal').modal('show');

    });
    $(document).on('click', '#saveNote', function(e) {

        const data = {
          _id: $(this).attr('data-id'),
          noteText: $('#noteInput').text()
        };
        $.ajax({
            url: '/api/notes',
            method: 'POST',
            data: data
        })
    })



});

