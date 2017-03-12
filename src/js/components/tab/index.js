import APP from '../app';

APP.tabs = {
    input: '.input-wrap',
    tabGroup: '.tabs-group',
    tabControls: '.tabs-controls__item',
    tabContent: '.tabs-content__item',
    tabContentList: '.tabs-content__list',

    init: function(){
        let _this = this;
        $(document).ready(function(){
            _this.tabControlsClick();
            _this.tabContentClick();
            _this.selectInputClick();
        });
    },

    tabControlsClick: function(){
        let _this = this;

        $('body').on('click', _this.tabControls, function() {
            let tabID = $(this).data('tab');

            //------active current tab controls
            $(_this.tabControls).removeClass('is-active');
            $(this).addClass('is-active is-checked');

            //------active current tab content
            $(_this.tabContent).removeClass('is-active');
            $('#'+tabID).addClass('is-active');
        });
    },

    tabContentClick: function(){
        let _this = this;
        let li = _this.tabContentList + ' > li';

        $('body').on('click', li, function() {
            let list = $(this).closest(_this.tabContentList);

            list.find('li').removeClass('is-active');
            $(this).addClass('is-active');
        });
    },

    selectInputClick: function(){
        let _this = this;

        $(_this.input).click(function() {
            let $target = $(this);

            if(!$target.hasClass('is-open')){
                $target.addClass('is-open');
                $(_this.tabGroup).addClass('is-active');
            }else{
                $target.removeClass('is-open');
                $(_this.tabGroup).removeClass('is-active');
            }
        });
    }
}
