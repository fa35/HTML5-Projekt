jQuery(document).ready(function(){
    var server = 'http:/localhost:8080';

    var updateTemperatureData = function(tempData) {
        jQuery('input[name=heatCurrent]').val(tempData.temperature);
        jQuery('input[name=heatWanted]').val(tempData.wanted);
        jQuery('input[name=heatAuto]').prop('checked', tempData.autodown);
    }

    var updateLightData = function(lightData) {
        jQuery('input[name=lightColor]').val('#' + lightData.color);
        jQuery('input[name=lightBrightness]').val(lightData.dim);
        jQuery('input[name=lightState]').prop('checked', lightData.state === 'on');
    }

    var update = function(server) {
        jQuery.get(server + '/temp/get/',{},updateTemperatureData);
        jQuery.get(server + '/light/get/',{},updateLightData);
        jQuery.get(server + '/coffee/get/',{},function(currentCoffeeData,statusMessage,jqxhr) {
            console.log(currentCoffeeData);
        });
    }

    jQuery('form#homefx_form').submit(function(event) {
        event.preventDefault();

        color = jQuery('input[name=lightColor]').val().substr(1);
        jQuery.get(server + '/light/set/color/' + color,{},updateLightData);

        dim = jQuery('input[name=lightBrightness]').val();
        jQuery.get(server + '/light/set/brightness/' + dim,{},updateLightData);

        lightState = jQuery('input[name=lightState]').prop('checked') ? 'on' : 'off';
        jQuery.get(server + '/light/set/state/' + lightState,{},updateLightData);


        heatWanted = jQuery('input[name=heatWanted]').val();
        jQuery.get(server + '/temp/set/wanted/' + heatWanted,{},updateTemperatureData);

        heatAuto = jQuery('input[name=heatAuto]').prop('checked') ? 'on' : 'off';
        jQuery.get(server + '/temp/set/autodown/' + heatAuto,{},updateTemperatureData);
    });

    update(server);
}); 