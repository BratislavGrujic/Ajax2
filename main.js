window.onload = function () {

    var container = document.querySelector('.container'),
        btn       = document.querySelector('.primary'),
        modal     = document.getElementById('myModal'),
        span      = document.getElementsByClassName('close')[0],
        title     = document.getElementById('picTitle'),
        counter   = 0,
        current,
        left      = document.getElementById('left'),
        right     = document.getElementById('right'),
        maxRight,
        isClicked,
        likeClicked;

    /*
     * Main function creating object for likes and dislikes
     */    
	var addItem = function (like,dislike,id) {
	    var oldItems = JSON.parse(localStorage.getItem('itemsArray')) || [];
	    
	    var newItem = {
	        'like': like,
	        'dislike': dislike,
	        'id': id
	    };
	    
	    oldItems.push(newItem);
	    
	    localStorage.setItem('itemsArray', JSON.stringify(oldItems));
	};

	/*
	 * Main function creating object for favourites
	 */
	var addFav = function (fav,id) {
		var oldItems = JSON.parse(localStorage.getItem('itemfavs')) || [];

		var newItem = {
			'fav': fav,
			'id' : id
		};

		oldItems.push(newItem);

		localStorage.setItem('itemfavs', JSON.stringify(oldItems));
	};
    
	/*
	 * Ajax main function
	 */
	fetch('https://jsonplaceholder.typicode.com/photos')
	  .then(response => response.json())
	  .then(function(json){
	  	[].forEach.call(json,function(e,key){

	  		// First 20 images
	  		if(key < 20){

			    // Creating a main container
			    var mainContainer = document.createElement('div');
			    mainContainer.classList.add('mainCont');
			    container.appendChild(mainContainer);

	  		    // Appending image div to main container
	            var imgPlaceHolder = document.createElement('div');
	            imgPlaceHolder.classList.add('imgHolder');
	            imgPlaceHolder.classList.add('col-lg-3');
	            imgPlaceHolder.innerHTML = '<img src=' + '"' + e.thumbnailUrl + '"' + '>' + '<p>' + e.id + '</p>';
	            mainContainer.appendChild(imgPlaceHolder);

	            // Like,dislike and favourites
	            var likePlaceHolder = document.createElement('div');
	            likePlaceHolder.classList.add('likeAndDislike');
	            likePlaceHolder.innerHTML = '<div class="like"></div>' + '<div class="dislike"></div>' + '<div class="favourite"></div>';
	            mainContainer.appendChild(likePlaceHolder);

	            // Like,dislike counter number
	            var likeCounterHolder = document.createElement('div');
	            likeCounterHolder.classList.add('likeCounterHolder');
	            mainContainer.appendChild(likeCounterHolder);

	            var dislikeCounterHolder = document.createElement('div');
	            dislikeCounterHolder.classList.add('dislikeCounterHolder');
	            mainContainer.appendChild(dislikeCounterHolder);

	               // Selecting all imageHolder divs and setting attributes
	            var imgHolder = document.querySelectorAll('.imgHolder'),
	               titleSet  = imgHolder[key].setAttribute('data-title', e.title),
	               imgSet    = imgHolder[key].setAttribute('data-img', e.url),
	               idSet     = imgHolder[key].setAttribute('data-ids', e.id),
	               bigPic    = document.getElementById('bigPic');
	               maxRight  = 20;

	            [].forEach.call(imgHolder,function(element,num){

	           	    // Getting all attributes on click
	    	        element.addEventListener('click',function(){
		    		    modal.classList.add('block');
		    		    var titleGet = imgHolder[num].getAttribute('data-title'),
		    		       imgGet   = imgHolder[num].getAttribute('data-img'),
		    		       idGet    = imgHolder[num].getAttribute('data-ids');
		    		       current  = idGet;
		    		       
		    		    // Setting image and title
		    		    title.innerHTML = titleGet;
		    		    bigPic.setAttribute('src',imgGet);
	    	        });
	            }); 
	        } 
	  	});

	  	// Selecting likes and dislikes
	    var likeAndDislike = document.querySelectorAll('.likeAndDislike'),
	        like           = document.querySelectorAll('.like'),
	        dislike        = document.querySelectorAll('.dislike'),
	        favourite      = document.querySelectorAll('.favourite'),
	        counterLike    = document.querySelectorAll('.likeCounterHolder'),
	        counterDislike = document.querySelectorAll('.dislikeCounterHolder');

	        // Setting id atributes to like and dislike div holder
	        [].forEach.call(likeAndDislike,function(e,key){
	            likeIdSet = likeAndDislike[key].setAttribute('data-id', key+1);   
	        });
        
        /*
         * Like button
         */
        [].forEach.call(like,function(elike,keylike){
        	elike.addEventListener('click',function(){
        		
        		var containClass  = likeAndDislike[keylike].classList.contains('liked');
        		    likeClicked   = true,
        		    likeIdGet     = likeAndDislike[keylike].getAttribute('data-id');
        		var localRes = JSON.parse(localStorage.getItem('itemsArray'));

        		if((containClass == true) && (likeClicked == true)){

        			likeAndDislike[keylike].classList.remove('liked');        
                    counterLike[keylike].innerHTML = 0;
        			counterDislike[keylike].innerHTML = 0;

        			if(localStorage.getItem('itemsArray') != null){
        				
        				[].forEach.call(localRes,function(elres,keyres){
        					
                			if(likeIdGet == elres.id){
                				
                				const filteredItems = localRes.filter(eLiked => eLiked.id != keylike+1);
                                localStorage.setItem('itemsArray', JSON.stringify(filteredItems));    
                			}
        		        });
        		    }
        		}
        		else {
        			likeAndDislike[keylike].classList.remove('disliked');
        		    likeAndDislike[keylike].classList.add('liked');

        		    if(localStorage.getItem('itemsArray') != null){
        				
        				[].forEach.call(localRes,function(elres,keyres){
        					
                			if(likeIdGet == elres.id){
                				
                				const filteredItems = localRes.filter(eLiked => eLiked.id != keylike+1);
                                localStorage.setItem('itemsArray', JSON.stringify(filteredItems));     
                			}
        		        });
        		    }
        		    addItem(true,false,keylike+1);
        		    counterLike[keylike].innerHTML = 1;
        			counterDislike[keylike].innerHTML = 0; 			
        		}
        	});	
        });

        /*
         * Dislike button
         */
        [].forEach.call(dislike,function(edislike,keydislike){
        	edislike.addEventListener('click',function(){
        		
        		var containClass  = likeAndDislike[keydislike].classList.contains('disliked');
        		    isClicked     = true,
        		    likeIdGet     = likeAndDislike[keydislike].getAttribute('data-id');
                var localRes = JSON.parse(localStorage.getItem('itemsArray'));

        		if((containClass == true) && (isClicked == true)){

        			likeAndDislike[keydislike].classList.remove('disliked');	
        			counterLike[keydislike].innerHTML = 0;
        			counterDislike[keydislike].innerHTML = 0;

        			if(localStorage.getItem("itemsArray") != null){

        				[].forEach.call(localRes,function(elres,keyres){

        					if(likeIdGet == elres.id){

        						const filteredItems = localRes.filter(edisLiked => edisLiked.id != keydislike+1);
                                localStorage.setItem('itemsArray', JSON.stringify(filteredItems));
        					}  
        				});
        			}	
        		}
        		else{
        			likeAndDislike[keydislike].classList.remove('liked');
            		likeAndDislike[keydislike].classList.add('disliked');

            		if(localStorage.getItem("itemsArray") != null){

        				[].forEach.call(localRes,function(elres,keyres){

        					if(likeIdGet == elres.id){

        						const filteredItems = localRes.filter(edisLiked => edisLiked.id != keydislike+1);
                                localStorage.setItem('itemsArray', JSON.stringify(filteredItems));
        					}  
        				});
        			}
            		addItem(false,true,keydislike+1);
            		counterLike[keydislike].innerHTML = 0;
        			counterDislike[keydislike].innerHTML = 1;			
        		}  		
        	});
        });

        /*
         * Favourite button
         */
         [].forEach.call(favourite,function(efav,keyfav){
         	efav.addEventListener('click',function(){
         		
         		var containClass  = favourite[keyfav].classList.contains('favourited');
        		    isClicked     = true,
        		    likeIdGet     = likeAndDislike[keyfav].getAttribute('data-id');
                var localRes = JSON.parse(localStorage.getItem('itemfavs'));

                if((containClass == true) && (isClicked == true)){

        			favourite[keyfav].classList.remove('favourited');	

        			if(localStorage.getItem("itemfavs") != null){

        				[].forEach.call(localRes,function(elres,keyres){

        					if(likeIdGet == elres.id){

        						const filteredItems = localRes.filter(efaved => efaved.id != keyfav+1);
                                localStorage.setItem('itemfavs', JSON.stringify(filteredItems));
        					}  
        				});
        			}	
        		}
        		else{
        			favourite[keyfav].classList.add('favourited');

            		if(localStorage.getItem("itemfavs") != null){

        				[].forEach.call(localRes,function(elres,keyres){

        					if(likeIdGet == elres.id){

        						const filteredItems = localRes.filter(efaved => efaved.id != keyfav+1);
                                localStorage.setItem('itemfavs', JSON.stringify(filteredItems));
        					}  
        				});
        			}
            		addFav(true,keyfav+1);
        		}
         	});
         });

        // Appending  localStorage results
        if(localStorage.getItem('itemsArray') != null){
        	var localRes = JSON.parse(localStorage.getItem('itemsArray'));
        	[].forEach.call(localRes,function(element,key){

        		if(element.like == true){

        			likeAndDislike[element.id - 1].classList.add('liked');
        			counterLike[element.id - 1].innerHTML = 1;
        			counterDislike[element.id - 1].innerHTML = 0;
        		}

        		if((element.dislike == true) && (element.like == false)){

        			likeAndDislike[element.id - 1].classList.add('disliked');
        			counterLike[element.id - 1].innerHTML = 0;
        			counterDislike[element.id - 1].innerHTML = 1;	
        		}
        	});
        }

        // Appending localStorage results
        if(localStorage.getItem('itemfavs') != null){
        	var localRes = JSON.parse(localStorage.getItem('itemfavs'));
        	[].forEach.call(localRes,function(element,key){

        		if(element.fav == true){

        			favourite[element.id - 1].classList.add('favourited');
        		}
        	});
        }

	  	/*
	  	 * Right button
	  	 */
	  	right.addEventListener('click',function(){

	  	 	current++;
	  	 	var imgHolder = document.querySelectorAll('.imgHolder');

	  	 	[].forEach.call(imgHolder,function(){
	  	 		var titleGet = imgHolder[current - 1].getAttribute('data-title'),
	  	 		    imgGet   = imgHolder[current - 1].getAttribute('data-img');

	  	 		    // Setting image and title
	  	 		    title.innerHTML = titleGet;
	  	 		    bigPic.setAttribute('src', imgGet);

	  	 		    // Max left and right
	  	 		    if(current > 1){
	  	 		    	left.classList.remove('notBlock');
	  	 		    }
	  	 		    if(current == maxRight){
	  	 		    	right.classList.add('notBlock');
	  	 		    }
	  	 	});
	  	});

	  	/*
	  	 * Left button
	  	 */
	  	left.addEventListener('click',function(){

	  	 	current--;
	  	 	var imgHolder = document.querySelectorAll('.imgHolder');

	  	 	[].forEach.call(imgHolder,function(){
	  	 		var titleGet = imgHolder[current - 1].getAttribute('data-title'),
	  	 		    imgGet   = imgHolder[current - 1].getAttribute('data-img');

	  	 		    // Setting image and title
	  	 		    title.innerHTML = titleGet;
	  	 		    bigPic.setAttribute('src', imgGet);

	  	 		    // Max left and right
	  	 		    if(current == 1){
	  	 		    	left.classList.add('notBlock');
	  	 		    }
	  	 		    if(current < maxRight){
	  	 		    	right.classList.remove('notBlock');
	  	 		    }
	  	 	});
	  	});

		// Next 20 images
	    btn.addEventListener('click',function(){

	    	json.splice(0,20);
	    	counter = counter + 20;
	    	maxRight = maxRight + 20;
	    	right.classList.remove('notBlock');
	    	left.classList.remove('notBlock');
	    	
	    	[].forEach.call(json,function(e,key){
	    		if(key < 20){
			        var imgPlaceHolder = document.createElement('div');
			        imgPlaceHolder.classList.add('imgHolder');
			        imgPlaceHolder.innerHTML = '<img src=' + '"' + e.thumbnailUrl + '"' + '>' + '<p>' + e.id + '</p>';
			        container.appendChild(imgPlaceHolder);
			        
			        var imgHolder = document.querySelectorAll('.imgHolder'),
	                    titleSet  = imgHolder[key+counter].setAttribute('data-title', e.title),
	                    imgSet    = imgHolder[key+counter].setAttribute('data-img', e.url),
	                    idSet     = imgHolder[key+counter].setAttribute('data-id', e.id),
	                    bigPic    = document.getElementById('bigPic');

	           [].forEach.call(imgHolder,function(element,num){
	    	       element.addEventListener('click',function(){

		    		   modal.classList.add('block');
		    		   var titleGet = imgHolder[num].getAttribute('data-title'),
		    		       imgGet   = imgHolder[num].getAttribute('data-img'),
		    		       idGet    = imgHolder[num].getAttribute('data-id');
		    		       current  = idGet;
		    		   
		    		   // Setting image and title
		    		   title.innerHTML = titleGet;
		    		   bigPic.setAttribute('src',imgGet);
	    	       });
	            }); //end of forEach divs
	            }
	    	}); 
	    });  
	});

	// When the user clicks on <span> (x), close the modal
	span.addEventListener('click',function() {
	    modal.classList.remove('block');
	});

	// When the user clicks anywhere outside of the modal, close it
	window.addEventListener('click',function(event) {
	    if (event.target == modal) {
	        modal.classList.remove('block');
	    }
	});

}// kraj onloada

// Progress bar i slika on mouseenter krece punjenje progress bara kad se napuni video krece sve dok je mis tu,kad se misom pomeri izvan vraca se slika i pauzira se video 