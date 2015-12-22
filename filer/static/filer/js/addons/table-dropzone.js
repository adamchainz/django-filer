// #DROPZONE#
// This script implements the dropzone settings
'use strict';

/* global Dropzone */
(function ($) {
    $(function () {
        var dropzoneSelector = '.js-dropzone';
        var dropzones = $(dropzoneSelector);
        var infoMessageClass = 'js-dropzone-info-message';
        var infoMessage = $('.' + infoMessageClass);
        var folderName = $('.js-dropzone-folder-name');
        var uploadInfo = $('.js-dropzone-upload-info');
        var uploadWelcome = $('.js-dropzone-upload-welcome');
        var uploadFileName = $('.js-dropzone-file-name');
        var uploadProgress = $('.js-dropzone-progress');
        var uploadSuccess = $('.js-dropzone-upload-success');
        var dragHoverClass = 'dz-drag-hover';
        var hiddenClass = 'hidden';
        var hideMessageTimeout;

        if (dropzones.length && Dropzone) {
            Dropzone.autoDiscover = false;
            dropzones.each(function () {
                var dropzone = $(this);
                var dropzoneUrl = $(this).data('url');
                new Dropzone(this, {
                    url: dropzoneUrl,
                    paramName: 'file',
                    maxFiles: 10,
                    previewTemplate: '<div></div>',
                    clickable: false,
                    addRemoveLinks: false,
                    maxfilesexceeded: function (file) {
                        this.removeAllFiles();
                        this.addFile(file);
                    },
                    dragover: function (dragEvent) {
                        uploadSuccess.addClass(hiddenClass);
                        infoMessage.removeClass(hiddenClass);
                        dropzone.addClass(dragHoverClass);

                        folderName.text($(dragEvent.target).parents(dropzoneSelector).data('folder-name'));
                    },
                    dragleave: function (dragEvent) {
                        var target = $(dragEvent.target);

                        clearTimeout(hideMessageTimeout);
                        if (!target.hasClass(infoMessageClass) && target.parents('.' + infoMessageClass).length === 0) {
                            clearTimeout(hideMessageTimeout);
                            hideMessageTimeout = setTimeout(function () {
                                infoMessage.addClass(hiddenClass);
                            }, 1000);
                        }
                        infoMessage.removeClass(hiddenClass);
                        dropzones.removeClass(dragHoverClass);
                    },
                    drop: function () {
                        clearTimeout(hideMessageTimeout);
                        infoMessage.removeClass(hiddenClass);
                        dropzones.removeClass(dragHoverClass);
                    },
                    sending: function (file) {
                        uploadWelcome.addClass(hiddenClass);
                        uploadFileName.text(file.name);
                        uploadProgress.width(0);
                        uploadInfo.removeClass(hiddenClass);
                    },
                    uploadprogress: function (file, progress) {
                        uploadProgress.width(progress + '%');
                    },
                    queuecomplete: function () {
                        uploadInfo.addClass(hiddenClass);
                        uploadSuccess.removeClass(hiddenClass);
                        window.location.reload();
                    }
                });
            });
        }
    });
})(jQuery);