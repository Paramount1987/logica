const APP = {
    $userList: $('#user-list'),
    users: '',
    currentUser: '',
    modalUser: '.modal-user',
    backdrop: '.backdrop',
    btnRemove: '.user-remove',

    domLoaded: function() {
        let _this = this;
        $(document).ready(function(){
            _this.getUser();
            _this.btnUserRemove();
        });
    },

    getUser: function(){
        let _this = this;
        $.getJSON('content/data/data.json', function(data){
            _this.users = data.users;
           _this.setUsersDom(_this.users);
        });
    },

    setUsersDom: function(users){
        let _this = this;

        users.forEach((user)=>{
            _this.$userList.append(`<li class="user-item">
                <div class="user-item__inner" data-userid="${user.id}">
                    <div class="user-photo"><img src="${user.photo}" alt="photo" class="user-photo__img"></div>
                    <div class="user-info">
                        <div class="user-info__name">${user.name}</div>
                        <div class="user-info__status">${user.status}</div>
                        <div class="user-info__rate">${user.rate}</div>
                    </div>
                    <div class="user-edit"><button class="user-remove" data-userid="${user.id}">del</button></div>
                </div>
            </li>`)
        });

        //---------------------swipe if touch device
        _this.swipeToRemove();
    },

    clearUsersDom: function(){
        this.$userList.html("");
    },

    removeUser: function(){
        let _this = this;

        _this.users.forEach((user, i)=>{
            if(user.id == _this.currentUser){
                //---------запрос на удаление юзера на сервер (сервера нет), если возвращается ок то удаляем
                _this.users.splice( i, 1);
                //update dom for users
                _this.clearUsersDom();
                _this.setUsersDom(_this.users);
                return;
            }
        });
    },

    showModalUser: function(){
        $(this.backdrop).addClass('is-open');
        $(this.modalUser).addClass('is-open');
    },

    removeModalUser: function(){
        $(this.backdrop).removeClass('is-open');
        $(this.modalUser).removeClass('is-open');
    },

    btnUserRemove: function(){
        let _this = this;

        $('#user-list').on('click', _this.btnRemove, function(){
            //--set current user
            _this.currentUser = $(this).data('userid');

            _this.showModalUser();
        });
        //----deny remove user and close modal
        $('body').on('click', '.js-btn-deny', function(){
            _this.removeModalUser();
            _this.swipedBack();
        });

        //----confirm remove user
        $('body').on('click', '.js-btn-remove', function(){
            _this.removeModalUser();
            _this.removeUser();
        });
    },

    swipeToRemove: function(){
        if(!('ontouchstart' in document.documentElement)){
            return;
        }
        let _this = this;

        $('.user-item__inner').each(function(){

            Hammer(this).on("swipeleft", function(e) {
                let target = e.target.closest('.user-item__inner');

                _this.currentUser = $(target).data('userid');
                $(target).css({left: "-50px"}).addClass('is-swiped');

                setTimeout(() => {_this.showModalUser()},200);
            });
        });
    },

    swipedBack: function(){
        if('ontouchstart' in document.documentElement){
            $('.is-swiped').css({left: "0"}).removeClass('is-swiped');
        }
    }
}

export default APP;
