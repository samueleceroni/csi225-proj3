jQuery(document).ready(function($){

    function createBookListItem(book){
        var $li = $('<li>');
        $li.addClass('list-group-item cursor-pointer hover-invert');
        var $h3 = $('<h5>');
        $h3.addClass('d-inline-block text-right pr-3 w-50');
        $h3.html(book.title);
        var $div = $('<div>');
        $div.addClass('d-inline-block w-50');
        $div.html(book.author);
        $li.append($h3);
        $li.append($div);
        $li.data('bookId', book.id);
        return $li;
    }

    function createBookDetailsCard(bookDetails){
        var $card = $('<div>');
        $card.addClass('card');
        $card.attr('id', 'book-details-card');
        var $cardRow = $('<div>');
        $cardRow.addClass('row no-gutters');
        var $bookCoverContainer = $('<div>');
        $bookCoverContainer.addClass('col-6 text-center');
        var $bookCover = $('<img>');
        $bookCover.addClass('card-img mt-auto mb-auto');
        $bookCover.attr('src', bookDetails.cover);
        $bookCover.attr('alt', 'Book Cover');
        $bookCoverContainer.html($bookCover);
        var $cardBodyContainer = $('<div>');
        $cardBodyContainer.addClass('col-6');
        var $cardBody = $('<div>');
        $cardBody.addClass('card-body');
        var $bookTitle = $('<h4>');
        $bookTitle.addClass('d-inline-block card-title');
        $bookTitle.html(bookDetails.title);
        var $bookDateAuthor = $('<h6>');
        $bookDateAuthor.addClass('text-secondary');
        $bookDateAuthor.html(bookDetails.year + ' - ' + bookDetails.author);
        var $bookCountry = $('<p>');
        $bookCountry.addClass('card-text mb-0');
        $bookCountry.html('Country: ' + bookDetails.country);
        var $bookLanguage = $('<p>');
        $bookLanguage.addClass('card-text mb-0');
        $bookLanguage.html('Language: ' + bookDetails.language);
        var $bookPages = $('<p>');
        $bookPages.addClass('card-text mb-0');
        $bookPages.html('Pages: ' + bookDetails.pages);
        var $bookLink = $('<a>');
        $bookLink.addClass('btn btn-dark mt-4');
        $bookLink.attr('href', bookDetails.link);
        $bookLink.html('Learn more...');
        $cardBody.append($bookTitle);
        $cardBody.append($bookDateAuthor);
        $cardBody.append($bookCountry);
        $cardBody.append($bookLanguage);
        $cardBody.append($bookPages);
        $cardBody.append($bookLink);
        $cardBodyContainer.html($cardBody);
        $cardRow.append($bookCoverContainer);
        $cardRow.append($cardBodyContainer);
        $card.html($cardRow);
        return $card;
    }

    $('div#book-list-container').html('Loading...');
    var requestBookList = axios.get('http://csc225.mockable.io/books');
    requestBookList.then(function(response){
        $ul = $('<ul>');
        $ul.addClass('list-group');
        $ul.attr('id', 'book-list');
        response.data.forEach(function(book){
            $ul.append(createBookListItem(book));
        });
        $('div#book-list-container').html($ul);

        $('.list-group-item').on('click', function(){
            $('.list-group-item').removeClass('active');
            $(this).addClass('active');
            var bookId = $(this).data('bookId');
            $('#book-details-card-container').html('Loading...');
            console.log(bookId);
            axios.get('http://csc225.mockable.io/books/' + bookId).then(function(response){
                var $bookCardDetails = createBookDetailsCard(response.data);
                $('#book-details-card-container').html($bookCardDetails);
            })
        })
    });
});