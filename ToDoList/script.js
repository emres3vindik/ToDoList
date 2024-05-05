$(document).ready(function () {
    checkEmptyList();

    $(".add-button").click(addTask);

    function addTask() {
        var taskText = $(".input-add-job").val();
        if (taskText !== "") {
            var checkbox = $("<input type='checkbox'>");
            var checkboxContainer = $("<span class='checkbox-container'></span>").append(checkbox);
            var taskSpan = $("<span class='task-text'></span>").text(taskText);
            var optionsIcon = $("<span class='options-icon'><i class='fas fa-ellipsis-v'></i></span>");
            var listItemContent = $("<div class='list-item-content'></div>").append(checkboxContainer).append(taskSpan);
            var listItem = $("<li class='list-group-item'></li>").append(listItemContent).append(optionsIcon);
            $(".task-list").append(listItem);
            $(".input-add-job").val("");
            $(".empty-list-message").remove();
        }

        checkEmptyList();
    }

    $(document).on("click", ".delete-button", function () {
        $(this).parent().remove();
        checkEmptyList();
    });

    $(document).on("click", ".edit-button", function () {
        var taskText = $(this).parent().text().trim();
        $(".input-add-job").val(taskText).focus();
        $(this).parent().remove();
        checkEmptyList();
    });

    $(".all-button").click(function () {
        $(".task-list li").show();
    });

    $(".continue-button").click(function () {
        $(".task-list li").show();
        $(".task-list li.finished").hide();
    });

    $(".finish-button").click(function () {
        $(".task-list li").hide();
        $(".task-list li.finished").show();
    });

    $(".Temizle").click(function () {
        $(".task-list").empty();
        checkEmptyList();
    });

    $(".input-add-job").keypress(function (e) {
        if (e.which === 13) {
            addTask();
        }
    });

    $(document).on("change", ".list-group-item input[type='checkbox']", function () {
        var taskItem = $(this).closest("li.list-group-item");
        if ($(this).is(":checked")) {
            taskItem.addClass("finished");
        } else {
            taskItem.removeClass("finished");
        }
    });

    $(document).on("click", ".options-icon", function (e) {
        e.stopPropagation();

        var taskItem = $(this).closest("li.list-group-item");
        var popupMenu = $("<div class='popup-menu'></div>");

        var editOption = $("<div class='option'><i class='fas fa-edit'></i><span class='option-text'> Düzenle</span></div>");
        editOption.click(function () {
            var taskText = taskItem.find("span.task-text").text().trim();
            $(".input-add-job").val(taskText).focus();
            taskItem.remove();
            popupMenu.remove();
            checkEmptyList();
        });

        var deleteOption = $("<div class='option'><i class='fas fa-trash-alt'></i><span class='option-text'> Sil</span></div>");
        deleteOption.click(function () {
            taskItem.remove();
            popupMenu.remove();
            checkEmptyList();
        });

        popupMenu.append(editOption).append(deleteOption);
        $(this).append(popupMenu);
    });

    $(document).click(function () {
        $(".popup-menu").remove();
    });

    function checkEmptyList() {
        if ($(".task-list li").length === 0 && $(".empty-list-message").length === 0) {
            $(".task-list").append("<p class='empty-list-message'>Yapılacaklar Listesi Boş</p>");
        } else {
            $(".empty-list-message").remove();
        }
    }
});
