var counter_lock;
var counter_closing;

$(document).ready(function () {
    $("#closing").hide();
    $("#unclosed").click(function () { 
        $("#lock").show();
        $("#closing").hide();
        $('.checkbox_closed').prop('checked', false);
        $('#all_checkbox_closed').prop('checked', false);
        $("#check_counter_close").text(0);
    });
    $("#closed").click(function () { 
        $("#closing").show();
        $("#lock").hide();
        $('.checkbox_unclosed').prop('checked', false);
        $('#all_checkbox').prop('checked', false);
        $("#check_counter_lock").text(0);
    });
    $("#failed").click(function () { 
        $("#lock").hide();
        $("#closing").hide();
        $("#check_counter_close").text(0);
        $('#all_checkbox').prop('checked', false);
        $('#all_checkbox_closed').prop('checked', false);
        $('.checkbox_unclosed').prop('checked', false);
        $('.checkbox_closed').prop('checked', false);
    });
    $("#success").click(function () { 
        $("#lock").hide();
        $("#closing").hide();
        $("#check_counter_lock").text(0);
        $('.checkbox_unclosed').prop('checked', false);
        $('.checkbox_closed').prop('checked', false);
    });
    
});

$(function() {
    // counter_lock = 0;
    // $("input:checked").each(function () {
    //     counter_lock++;
    // });
    // $("#check_counter_lock").text(counter_lock);
    // counter_lock = 0;
    
    // $(".checkbox_unclosed").change(function() {
    //     counter_lock = 0;
    //     // $("input:checked").each(function () {
    //     //     counter_lock++;
    //     // });
        
    //     $("#check_counter_lock").text(counter_lock);
    //     counter_lock = 0;
    // });

    // $('closing_form').submit(function () {
    //     if (confirm("Are you sure you want to submit the value of ?"))
    //        return true;
    //     else
    //       return false;
    //  });
});

$(function() {
    // counter_closing = 0;
    // $("input:checked").each(function () {
    //     counter_closing++;
    // });
    // $("#check_counter_close").text(counter_closing);
    // counter_closing = 0;
    
    // $(".checkbox_closed").change(function() {
    //     $("input:checked").each(function () {
    //         counter_closing++;
    //     });
    //     $("#check_counter_close").text(counter_closing);
    //     counter_closing = 0;
    // });

    // $('closing_form').submit(function () {
    //     if (confirm("Are you sure you want to submit the value of ?"))
    //        return true;
    //     else
    //       return false;
    //  });
});

