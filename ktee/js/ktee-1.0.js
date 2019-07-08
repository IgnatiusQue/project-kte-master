var kt_tree;
var kt_layout;
var kt_target;
 class kTerminal { 

  constructor(_kt_tree,_kt_layout,_kt_target) {
    kt_tree = _kt_tree;
    kt_layout = _kt_layout; 
    kt_target = _kt_target;
    
  }

  init() { kt_core.init();   }   
 }
 
 var kt_core = {


  init: function() {




    //var pid ='pan-kterminal-container'; // creating branch id  id   
    kt_core.branch.create(kt_tree, kt_target);
	
 kt_core.panel.navigate.go(kt_tree.panels[0].id);


 //	SIZE TO FULL BODY 

    if (kt_layout.fullBody) {
      $("#kterminal-container").css("top",0);
      $("#kterminal-container").css("height", $(document).height());
        } else {
			 $("#kterminal-container").css("height", kt_layout.initialSize + 'px');
		}
		
		
       
		/*
		
		 $(".kt-textarea").css("height", kt_core.panel.get.height(kt_tree.panels[0].id));
		 $(".kt-iframe").css("height", kt_core.panel.get.height(kt_tree.panels[0].id));
		 
		 
      $(".kt-textarea").css("height", $("#kterminal-container").height() - $("#" + kt_tree.id + "-head").height() - $("#" + kt_tree.id + "-head").height());
      $(".kt-iframe").css("height", $("#kterminal-container").height() - $("#" + kt_tree.id + "-head").height() - $("#" + kt_tree.id + "-head").height());
  */
      
 
	//RESIZABLE
    if (kt_layout.resizable) {
      $("#kterminal-container").resizable({
        handles: 'n',
        minHeight:  $("#" + kt_tree.id + "-top").height() + $("#" + kt_tree.id + "-head").height()   + $("#" + kt_tree.id + "-foot").height() + 12,
        maxHeight: $(window).height()


      });


      //WINDOW RESIZE LISTENER 
      //window.addEventListener("resize", kt_core.onWindowResize);
      //TERMINAL AND LOG RESIZE LISTENER 
      $(window).resize(function() {
        kt_core.branch.adaptSize();

      });
    }// /RESIZABLE
	
	
    //	NATIVE CONTROLS
    $(".kt-hide-container").click(function() {
      $('#' + kt_tree.id + '-body').css("display", "none");
    });
    $(".kt-toggle-container").click(function() {
      $('#' + kt_tree.id + '-body').toggle();
    });
	  
 $(".kt-btn-navigate").click(function(e) { 

   kt_core.panel.navigate.go($(this).val());
    });
	
	$(".kt-btn-navigate-back").click(function(e) { 
   kt_core.panel.navigate.to(-1);
    });
	$(".kt-btn-navigate-next").click(function(e) { 
     kt_core.panel.navigate.to(+1);
    });
	 
  
	

  },

  log: {
    rows: [],
    add: function(subject,content) { 
	var d = new Date();
	now =  ("00" + (d.getMonth() + 1)).slice(-2) + "/" +   ("00" + d.getDate()).slice(-2) + "/" +    d.getFullYear() + " " +  ("00" + d.getHours()).slice(-2) + ":" +   ("00" + d.getMinutes()).slice(-2) + ":" +   ("00" + d.getSeconds()).slice(-2);
 
	 kt_core.log.rows.push({datetime:now,subject:subject,content:content});
      $('<tr><td class="kt-table-cell-sm">'+now+'</td><td class="kt-table-cell-sm">'+subject+'</td><td>'+content+'</td></tr>').appendTo('#' + kt_tree.id + '-kt-table');
      kt_core.branch.adaptSize();
      $('#' + kt_tree.id + '-kt-table-container').scrollTop($('#' + kt_tree.id + '-kt-table-container')[0].scrollHeight);
    },
	clear:function(){
		kt_core.log.rows=[];
		 $('#' + kt_tree.id + '-kt-table').html('');
	}
  },
  branch: {
    create: function(branch, kt_target) {
		
		if(0!=(kt_core.object.get.byPosition('top-l',branch).objects.length + kt_core.object.get.byPosition('top-r',branch).objects.length)){
      $('	 <div id="' + branch.id + '-top" class="' + kt_layout.top + '"> 		 </div>	').appendTo('#' + kt_target);
	  $('	 <div id="' + branch.id + '-top-l" class="inline ' + kt_layout.topL + '">  	 </div>	').appendTo('#' + branch.id+ '-top');
      $('	 <div id="' + branch.id + '-top-r" class="inline float-right col-auto ' + kt_layout.topR + '"> 	 </div>	').appendTo('#' + branch.id + '-top');
		}
		
			if(0!=(kt_core.object.get.byPosition('breadcrumb-l',branch).objects.length + kt_core.object.get.byPosition('breadcrumb-r',branch).objects.length)){
      $('	 <div id="' + branch.id + '-breadcrumb" class="' + kt_layout.breadcrumb + '"> 		 </div>	').appendTo('#' + kt_target);
	  $('	 <div id="' + branch.id + '-breadcrumb-l" class="inline ' + kt_layout.breadcrumbL + '">  	 </div>	').appendTo('#' + branch.id+ '-breadcrumb');
      $('	 <div id="' + branch.id + '-breadcrumb-r" class="inline float-right col-auto ' + kt_layout.breadcrumbR + '"> 	 </div>	').appendTo('#' + branch.id + '-breadcrumb');
		}
 
      $('	 <div id="' + branch.id + '-body" class=""> 		 </div>	').appendTo('#' + kt_target);

      $('	 <div id="' + branch.id + '-head" class="' + kt_layout.head + '" > 	 </div>	').appendTo('#' + branch.id + '-body');
      $('	 <div id="' + branch.id + '-head-l" class="inline ' + kt_layout.headL + '"> 	 </div>	').appendTo('#' + branch.id + '-head');
      $('	 <div id="' + branch.id + '-head-r" class="inline float-right col-auto ' + kt_layout.headR + '"> 	 </div>	').appendTo('#' + branch.id + '-head');




      $('	 <div id="' + branch.id + '-panels" class=""> 	 </div>	').appendTo('#' + branch.id + '-body');

      $('	 <div id="' + branch.id + '-branch" style="display: block;"></div>	').appendTo('#' + branch.id + '-panels');



      $('	 <div id="' + branch.id + '-foot" class="' + kt_layout.foot + '"  > 	 </div>	').appendTo('#' + kt_target);
      $('	 <div id="' + branch.id + '-foot-l" class="inline ' + kt_layout.footL + '"> 	 </div>	').appendTo('#' + branch.id + '-foot');
      $('	 <div id="' + branch.id + '-foot-r" class="inline float-right col-auto ' + kt_layout.footR + '"> 	 </div>	').appendTo('#' + branch.id + '-foot');



      //createPanel('aPanel');
      kt_core.object.buildAll(branch, branch.id);
      kt_core.panel.buildAll(branch, branch.id);


    },
  /*  show:function(tabId, branchId, dropId, tabName) {

      $('.tabs-' + branchId).removeClass(kt_layout.allTabsMenu.selected);
      $('#tab-' + tabId).addClass(kt_layout.allTabsMenu.selected);

      $('.level-' + branchId).hide();
      $('#' + tabId).show();
      $('#' + dropId).html(tabName);


    }, */
	
    adaptSize: function() {
// GETACTIVE BRANCH TODO 
      $("#kterminal-container").css("bottom", 0);
	  
	      // KTERMINAL TEXTAREA (If exist) HEIGHT
		 $(".kt-textarea").css("height", kt_core.panel.get.height( kt_core.panel.current));
		   // MODULE IFRAME (If exist) HEIGHT
		 $(".kt-iframe").css("height", kt_core.panel.get.height( kt_core.panel.current));
		  
	  
	  
	  
	  
  //    $("#" + kt_tree.id + "-kt-textarea").css("height", $("#kterminal-container").height() -  $("#" + kt_tree.id + "-head").height() - $("#" + kt_tree.id + "-head").height());
    //  $("#" + kt_tree.id + "-kt-table-container").css("height", $("#kterminal-container").height() -  $("#" + kt_tree.id + "-head").height() - $("#" + kt_tree.id + "-head").height());
    }, 
   getPath:function(branchId,branch=kt_tree,path){  // NO USADO
		  if(path==undefined){path=[];path.push(branch.id);}
		for(i=0;i<branch.panels.length;i++){
	if(branch.panels[i].type!='branch'){continue;}
	 if(branch.panels[i].branch.id==branchId){
		
		 path.push(branchId);
		 return path;
		 }else{
			 path.push(branch.panels[i].branch.id);
			return kt_core.branch.getPath(branchId,branch.panels[i].branch,path);
		 }
		 
	 }		  
		   
		   
		   
	   }

  },
  object: {

    buildAll: function(branch, kt_target) {
      //alert(kt_target);
      var objects = branch.objects;
      ///OBJECT CREATOR
      for (var i = 0; i < objects.length; i++) {

        switch (objects[i].type) {

          case "html":
            kt_core.object.item.html(branch, i, kt_target);
            break;
          case "menu.all.tabs":
            kt_core.object.item.allTabsMenu(branch, i, kt_target);
            break;
          case "drop.all.tabs":
            kt_core.object.item.allTabsDrop(branch, i, kt_target);
            break;
          case "me.hide":
            kt_core.object.item.meHide(branch, i, kt_target);
            break;
          case "me.toggle":
            kt_core.object.item.meToggle(branch, i, kt_target);
            break;
			case "navigate.next":
            kt_core.object.item.navigateNext(branch, i, kt_target);
            break;
			case "navigate.back":
            kt_core.object.item.navigateBack(branch, i, kt_target);
            break;
          case "progress.bar":
            kt_core.object.item.progressBar(branch, i, kt_target);
            break;
			 case "route.bar":
            kt_core.object.item.routeBar(branch, i, kt_target);
            break;
        }
      }
    },
   get:{
	byType:function(type,branch=kt_tree){ // ::NU
		var res=[];
	     for(var i=0;i<branch.objects.length;i++){
			  if(branch.objects[i].type==type){
				  res.push(branch.objects[i]);
				  }
		 }
		 
		 return {branchId:branch.id,objects:res};
		 
   },
   	byPosition:function(position,branch=kt_tree){
		var res=[];
	     for(var i=0;i<branch.objects.length;i++){
			  if(branch.objects[i].position==position){
				  res.push(branch.objects[i]);
				  }
		 }
		 
		 return {branchId:branch.id,objects:res};
		 
   },
	   byId:function(id,branch=kt_tree){ 
	  
	 
	   for(var i=0;i<branch.objects.length;i++){
		   if(branch.objects[i].id==undefined){continue;}
		   if(branch.objects[i].id==id){return {branchId:branch.id,object:branch.objects[i]};} 
		     
			 
	   }  

	        for(var j=0;j<branch.panels.length;j++){
			 if(branch.panels[j].branch!=undefined){
			
			return kt_core.object.get.byId(id,branch.panels[j].branch);
			//if(sub!=null){ return  sub; }  
			}  
	   }
	   
	     return null;
	   }
   },

   item: {
      html: function(branch, i, kt_target) {
		   if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
		   var object=branch.objects[i];
        $('<div id="'+object.id+'" class="inline '+object.position+'">'+object.html+'</div>').appendTo('#' + kt_target + '-' + object.position);
      },
      meToggle: function(branch, i, kt_target) {
       if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
	   var object = branch.objects[i];
        $('<button id="'+object.id+'" type="button"  class="' + kt_layout.meToggle + ' '+object.position+' kt-toggle-container"><i class="fa fa-caret-up"></i></button>').appendTo('#' + kt_target + '-' + branch.objects[i].position);

      },
      meHide: function(branch, i, kt_target) {
		   if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
	   var object = branch.objects[i];
	    $('<button id="'+object.id+'" type="button"  class="' + kt_layout.meHide + '  '+object.position+' kt-hide-container"><i class="fa fa-caret-down"></i></button>').appendTo('#' + kt_target + '-' + branch.objects[i].position);

        //$('<button type="button"  class="btn btn-primary  kt-btn-maximize"><i class="fa fa-window-maximize"></i></button>').appendTo('#terminal-header-right');
        //$('<button type="button"  class="btn btn-success  kt-btn-mediumize"><i class="fa fa-table"></i></button>').appendTo('#terminal-header-right');
        //$('<button type="button"  class="btn btn-warning  kt-btn-minimize"><i class="fa fa-window-minimize"></i></button>').appendTo('#terminal-header-right');
             },
	  navigateNext: function(branch, i, kt_target) {
		   if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
	   var object = branch.objects[i];
	    $('<button id="'+object.id+'" type="button"  class="' + kt_layout.navigateNext + '  '+object.position+' kt-btn-navigate-next"><i class="fa fa-caret-right"></i></button>').appendTo('#' + kt_target + '-' + branch.objects[i].position);
             },
	  navigateBack: function(branch, i, kt_target) {
		   if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
	   var object = branch.objects[i];
	    $('<button id="'+object.id+'" type="button"  class="' + kt_layout.navigateBack + '  '+object.position+' kt-btn-navigate-back"><i class="fa fa-caret-left"></i></button>').appendTo('#' + kt_target + '-' + branch.objects[i].position);
             },
     
 	  allTabsDrop(branch, i, kt_target) {
		  
	 if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
	 
      // if(branch.objects[i].id==undefined){ branch.objects[i].id='drop-' + kt_target + '-' + branch.objects[i].position;} 
	 
        var object = branch.objects[i];
        var panels = branch.panels;
	
		
        $('<div id="'+ object.id + '" class="btn-group '+object.position+'"></div>').appendTo('#' + kt_target + '-' + object.position);

        $('<div class="dropdown"> ' +
          '<button name="kt-drop-all-tabs-'+branch.id+'" id="drop-' + kt_target + '-' + object.position + '-button" class="' + kt_layout.allTabsDrop.button + ' " type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' +
          // 'Dropdown button'+
          panels[0].name +
          '</button>' +
          '<div id="drop-' + kt_target + '-' + object.position + '-items" class="dropdown-menu" aria-labelledby="dropdownMenuButton">' +
          '</div> </div> ').appendTo('#' + object.id);

        for (var j = 0; j < panels.length; j++) {

           $('<button   class="dropdown-item kt-btn-navigate" value="'+panels[j].id+'" >' + panels[j].name + '</button>').appendTo('#drop-' + kt_target + '-' + object.position + '-items');
        }
        //	  $('<a class="dropdown-item" href="#">Action</a>' ).appendTo('#drop-'+kt_target+'-'+object.position+'-items');
        //  $('<a class="dropdown-item" href="#">Action</a>' ).appendTo('#drop-'+kt_target+'-'+object.position+'-items');

        /*
        '<a class="dropdown-item" href="#">Another action</a>'+
        '<a class="dropdown-item" href="#">Something else here</a>'+*/
      },
      allTabsMenu(branch, i, kt_target) {
 
 if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
     var object = branch.objects[i];
    var panels = branch.panels;
        //	alert(''+kt_target+'-'+object.position);
		
        $('<div id="' + object.id + '" class="btn-group '+object.position+'"></div>').appendTo('#' + kt_target + '-' + object.position);

        for (var j = 0; j < panels.length; j++) {
          //CHECK EXCLUDES 
          if (object.excludes != undefined) {
            var _continue = false;
            for (var k = 0; k < object.excludes.length; k++) {
           
              if (object.excludes[k] == panels[j].id) {
                _continue = true;
              }
            }
            if (_continue) {
              continue;
            }
          }
          //SELECT FIRST TAB BUTTON 

          var buttonClass = '';
          if (j == 0) {
            buttonClass = kt_layout.allTabsMenu.button + ' ' + kt_layout.allTabsMenu.selected;
          } else {
            buttonClass = kt_layout.allTabsMenu.button;
          }

     //     $('<button type="button" onclick=" kt_core.branch.show(\'' + panels[j].id + '\',\'' + branch.id + '\',\'' + 'drop-' + kt_target + '-' + object.position + '-button' + '\',\'' + panels[j].name + '\');" id="tab-' + panels[j].id + '" value="' + panels[j].id + '" class="tabs-' + branch.id + ' ' + buttonClass + ' kt-btn-navigate">' + panels[j].name + '</button>').appendTo('#' + object.id);
          $('<button type="button"  id="tab-' + panels[j].id + '" value="' + panels[j].id + '" class="tabs-' + branch.id + ' ' + buttonClass + ' kt-btn-navigate">' + panels[j].name + '</button>').appendTo('#' + object.id);

        }

      },
      progressBar: function(branch, i, kt_target) { 
	if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
     var object = branch.objects[i];
 
		
$('<div  id="' + object.id + '" class="inline  ' + kt_layout.progressBar.container + ' '+object.position+'" ></div>').appendTo('#' + kt_target + '-' + object.position);
	 
			
$('<div class="inline" > <div class="progress ' + kt_layout.progressBar.outer + ' " >  '+
'<div class=" progress-bar ' + kt_layout.progressBar.inner + '" id="' + object.id + '-bar" role="progressbar" style="width: 0%" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"> </div>'+
'</div>').appendTo('#' + object.id );
if(object.showPercentage){
$('<div class="inline kt-progressbar-percentage-container" > '+ ' <span  id="' + object.id + '-percentage" class="'+ kt_layout.progressBar.percentage + ' inline">&nbsp;&nbsp;0%</span></div>'+
'').appendTo('#' + object.id );
}
if(object.showLabel){
$('<div class="inline kt-progressbar-label-container" ><a  id="' + object.id + '-label" class="'+ kt_layout.progressBar.label + '"></a></div>'+
'').appendTo('#' + object.id );

}
		 
		if(object.showOnIdle){$('#' +object.id + '').show();}else{$('#' +object.id + '').hide();}
      },

 routeBar: function(branch, i, kt_target) { 
//	if(branch.objects[i].id==undefined){ branch.objects[i].id= branch.id+ '-o'+i;} 
     var object = branch.objects[i];
	 
//$('<div id="'+object.id+'"   class="inline ' + kt_layout.routeBar.container + '  '+object.position+'"><span id="' + object.id + '-label" class=" inline ' + kt_layout.routeBar.inner + ' " >Route</span></div>').appendTo('#' + kt_target + '-' + branch.objects[i].position);
$('<div id="'+object.id+'"   class="inline ' + kt_layout.routeBar.container + '  '+object.position+'"><div id="kt-routebar-inner" class=" inline ' + kt_layout.routeBar.inner + ' " ></span></div>').appendTo('#' + kt_target + '-' + branch.objects[i].position);

	 
 }

    }
 
 },
  panel: {
	  current:'',
	  navigate:{
		  history:[],
		  historyIndex:-1,
		  
		  go:function(panelId){
		     
		  var path = kt_core.panel.get.path(panelId);
		  
		   if (path==undefined){ return path;} 
		 
		  for(var i=0;i<path.length;i++){
			  
			  kt_core.panel.navigate.goInBranch(path[i]);
			 
		  }
		   kt_core.panel.navigate.history.push(path);
		   kt_core.panel.navigate.historyIndex= kt_core.panel.navigate.history.length-1;
		   
		   
		   // IF IT HAS BRANCHES; WHEN PANEL IS SHOWN IT SELECTS THE FIRST CHILD
		   if( kt_core.panel.get.byId(panelId).panel.type=="branch"){ 
		 //  alert(kt_core.panel.get.byId(panelId).panel.branch.panels[0].id);
			   kt_core.panel.navigate.goInBranch(kt_core.panel.get.byId(panelId).panel.branch.panels[0].id);
		   }
		    
		   	kt_core.routeBar.update(path);
	   },
	    to:function(step){
			
		kt_core.panel.navigate.historyIndex+=step;
		if(	kt_core.panel.navigate.historyIndex>(kt_core.panel.navigate.history.length-1)){kt_core.panel.navigate.historyIndex=kt_core.panel.navigate.history.length-1;}
		if(	kt_core.panel.navigate.historyIndex<0){kt_core.panel.navigate.historyIndex=0;}
		
		  var path =  kt_core.panel.navigate.history[kt_core.panel.navigate.historyIndex];
		    
		
		   if (path==undefined){ return path;} 
		  for(var i=0;i<path.length;i++){
			  kt_core.panel.navigate.goInBranch(path[i]);
			  
		  }
		  	kt_core.routeBar.update(path);
		  return path;
		 //  kt_core.panel.navigate.history.push(path);
		 //  kt_core.panel.navigate.historyIndex= kt_core.panel.navigate.history.length-1;
	   },
	   goInBranch:function(panelId) {
		  
		 
		   var paneldata =kt_core.panel.get.byId(panelId);
		   var panel=paneldata.panel;
		   var branchId=paneldata.branchId;
		    //Find menu.all.tabs button with this value  
		 //var allMenuTabsObject=$(":button[value="+panelId+"]").attr('id') ;
		// alert('#'+$(":button[value="+panelId+"]").attr('id') );
		  
		    // KTERMINAL TEXTAREA (If exist) HEIGHT
		 $(".kt-textarea").css("height", kt_core.panel.get.height(panelId));
		   // MODULE IFRAME (If exist) HEIGHT
		 $(".kt-iframe").css("height", kt_core.panel.get.height(panelId));
		  
		  
		  //  ALL TAB MENU OBJECT (If exist) MARKING
		//  $('.kt-btn-navigate').removeClass(kt_layout.allTabsMenu.selected);
		  $('.tabs-' +branchId).removeClass(kt_layout.allTabsMenu.selected); 
		  $(":button[value="+panelId+"]").addClass(kt_layout.allTabsMenu.selected);
		  
		  //  ALL TAB DROP OBJECT (If exist) MARKING
		   $(':button[name="kt-drop-all-tabs-'+branchId+'"]').html(panel.name);

		  // SHOW PANEL 
		  
	  $('.level-' +kt_core.panel.get.byId(panelId).branchId).hide();
        $('#'+panelId).show();
	
		
	kt_core.panel.current=panelId;
		   //Find 
     
	//  alert( "PANEL ID "+ $(tab).val());
	 
       //$('.kt-btn-navigate').removeClass(kt_layout.allTabsMenu.selected);
  //    $(tab).addClass(kt_layout.allTabsMenu.selected);
   
    //  $('#' + dropId).html(tabName);


    }
    
	  },
	
	
	buildAll: function(branch, kt_target) {

      var panels = branch.panels;


      ///PANEl CREATOR
      for (var i = 0; i < panels.length; i++) {
        var display = '';
        if (i != 0) {
          display = 'style="display:none"'
        }
        switch (panels[i].type) {

          case "terminal":  kt_core.panel.item.terminal(branch, i, kt_target);  break;
          case "log":  kt_core.panel.item.log(branch, i, kt_target);  break;
          case "html":  kt_core.panel.item.html(branch, i, kt_target);  break;
          case "branch":  kt_core.panel.item.branch(branch, i, kt_target);  break;
          case "embed":  kt_core.panel.item.embed(branch, i, kt_target);  break;
 
 
        }
      }

    },
	item:{
		branch:function(branch, i, kt_target){
		 var panels=branch.panels;
			 $('<div    class="level-' + branch.id + '" id="' + panels[i].id + '"> </div>').appendTo('#' + kt_target + '-panels');
			kt_core.branch.create(panels[i].branch, panels[i].id + '', panels[i].id);
			},
			embed:function(branch, i, kt_target){
	    	 var panels=branch.panels;
		 
					$('<div    class="level-' + branch.id + '" id="' + panels[i].id + '">'+
					'<object class="kt-iframe" width="100%" data="'+panels[i].url+'">'+
					' </div>').appendTo('#' + kt_target + '-panels'); 
					 
			},
			html:function(branch, i, kt_target){
					 var panels=branch.panels;
			  $('	 <div   class="level-' + branch.id + '" id="' + panels[i].id + '"> </div>').appendTo('#' + kt_target + '-panels');
               $(kt_core.module.set.all(panels[i].html)).appendTo('#' + panels[i].id);
			},
		 terminal:function(branch, i, kt_target){
			 	 var panels=branch.panels;
			  $('<div   class="level-' + branch.id + ' " id="' + panels[i].id + '"><textarea id="kterminal-textarea" class="kt-textarea" >' + panels[i].text + '</textarea></div>').appendTo('#' + kt_target + '-panels');
         },
		log:function(branch, i, kt_target){
				 var panels=branch.panels;
			$('<div   class="level-' + branch.id + ' " id="' + panels[i].id + '">' +
              '<div id="' + branch.id + '-kt-table-container" class="kt-table-container">' +
              '<table id="' + branch.id + '-kt-table" class="kt-table" ></table>' +
              '</div></div>').appendTo('#' + kt_target + '-panels');       
		},
		 
	},
	 get:{
		height:function(panelId){
			// SUBSTRACT PANEL HEIGHTS
			var path = kt_core.panel.get.path(panelId);
			console.log(path);
			var branchId = kt_core.panel.get.byId(panelId).branchId;
			var h = 0;
			var top = $('#'+ kt_tree.id  + '-top').outerHeight();
			var head = $('#'+branchId + '-head').outerHeight();
			var breadcrumb = $('#'+ kt_tree.id  + '-breadcrumb').outerHeight();
			var foot = $('#'+ kt_tree.id + '-foot').outerHeight();
			
			
			 
			if(top!=undefined){h=h+top;} 
			//console.log("top "+top);
			  
			  if(head!=undefined){h=h+(head*path.length);} 
			//console.log("head "+head*path.length);
			
			if(breadcrumb!=undefined){h=h+breadcrumb;} 
			//console.log("breadcrumb "+breadcrumb);
			  
		 	if(foot!=undefined){h=h+foot;} 
			//console.log("foot "+foot);
			  
			  
		 	 
				
		 
			
			  console.log($("#kterminal-container").css('height') + '  -  ' + h);
			
			  h = $("#kterminal-container").outerHeight() -h;

				console.log(h);
			return h;
		 
		},
		path:function(panelId,branch=kt_tree,path=[]){   
		
		 if(path==undefined){path=[];}
		  
		  
		for(i=0;i<branch.panels.length;i++){
		var   a =branch.panels[i]; 
		if(a.id==panelId){ path.push(a.id);    return path; }
       
	 
	 
		if(a.type!='branch'){continue;}
		for(j=0;j<a.branch.panels.length;j++){
		var   b =a.branch.panels[j]; 
		if(b.id==panelId){path.push(a.id); path.push(b.id);   return path; }
		
		
		if(b.type!='branch'){continue;}
		for(k=0;k<b.branch.panels.length;k++){
		var   c =b.branch.panels[k]; 
		if(c.id==panelId){path.push(a.id); path.push(b.id);path.push(c.id);  return path; }
		
		
		if(c.type!='branch'){continue;}
		for(l=0;l<c.branch.panels.length;l++){
		var   d =c.branch.panels[l]; 
		if(d.id==panelId){path.push(a.id); path.push(b.id);path.push(c.id); path.push(d.id);  return path; }
		
		} // d
        } // c
		 } // b
		}  //a
		 
		  
		   
		   
		   
	   },
		byId:function(id,branch=kt_tree){ 
	   
	   
	   
	   	for(i=0;i<branch.panels.length;i++){
		var   a =branch.panels[i];  
         if(a.id==id){return {branchId:branch.id,panel:a};} 
	 
	 
	 
		 if(a.type!='branch'){continue;}
		for(j=0;j<a.branch.panels.length;j++){
		var   b =a.branch.panels[j];  
		  if(b.id==id){return {branchId:a.branch.id,panel:b};} 
		
		
		 if(b.type!='branch'){continue;}
		for(k=0;k<b.branch.panels.length;k++){
		var   c =b.branch.panels[k];  
		  if(c.id==id){return {branchId:b.branch.id,panel:c};} 
		
		
		 if(c.type!='branch'){continue;}
		for(l=0;l<c.branch.panels.length;l++){
		var   d =c.branch.panels[l];  
		  if(d.id==id){return {branchId:c.branch.id,panel:d};} 
		
		} // d
        } // c
		 } // b
		}  //a
	   
	   
	   
	   
	   
	   
	   
	  	// alert(branch.id);
	   for(var i=0;i<branch.panels.length;i++){
		   if(branch.panels[i].id==undefined){continue;}
		   if(branch.panels[i].id==id){return {branchId:branch.id,panel:branch.panels[i]};} 
			//console.log(branch.panels[i].id + ' == ' +id );
	   }  
	   
	        for(var j=0;j<branch.panels.length;j++){
			 if(branch.panels[j].branch!=undefined){
			
			return kt_core.panel.get.byId(id,branch.panels[j].branch);
			//if(sub!=null){ return  sub; }  
			}  
	   }
	   
	     return null;
	   }
   }
 
 },
 module:{
	 build(module){
		switch(module.type){
				case "html":
			return kt_core.module.item.html(module);
			break;
			case "iframe":
			return kt_core.module.item.iframe(module);
			break;
		}
		
	 },
	 item:{
		 html:function(module){
			 return module.html;
		 },
		  iframe:function(module){
			 
			 
			 return   '<object class="kt-iframe" width="100%" data="'+module.url+'">';
			   //'<iframe src="'+module.url+'" height="100%"  width="100%"></iframe>';
			
		 }
	 },
	 set:{
		 all:function(str){
		 
 var modules=kt_core.module.get.all(str);
for(var i=0;i<modules.length;i++){
   
 for(var j = 0;j<kt_tree.modules.length;j++){
	 if(modules[i]==kt_tree.modules[j].id){
		 str =str.replace(new RegExp(modules[i],"g"), kt_core.module.build(kt_tree.modules[j]));
	//	 alert(str);
	 } 
 } 
  
}
return str;

}
		 },
	 
	 get:{ 
 all:function(str){ 
 var match =str.match(/<mod>(.*?)<\/mod>/g);
 if(match==null){return [];}
   return match.map(function(val){
   return val.replace(/<\/?mod>/g,'');
});
}
 
  
 }
 },
 progressBar: {
    timer: [],
    stop: function(progressBarId) {
		
	 var object=kt_core.object.get.byId(progressBarId,kt_tree).object;
	 console.log(object);
	if (object.aloneInPosition){  	$('.'+object.position).show(); }
		
      clearInterval(kt_core.progressBar.timer[progressBarId]);
	    kt_core.progressBar.setValue(progressBarId, 0);
	 
 
	 if (!object.showOnIdle){  	$('#' +progressBarId ).hide(); }
	 
	 
    },
    play: function(progressBarId) {
	 var object=kt_core.object.get.byId(progressBarId,kt_tree).object;
	if (object.aloneInPosition){  $('.'+object.position).hide(); 	}
	
	$('#' +progressBarId + '').show();
      var value = 0;
      kt_core.progressBar.timer[progressBarId] = setInterval(function() {
        kt_core.progressBar.setValue(progressBarId, value);
        value++;
        if (value > 100) value = 0;
      }, 10);

    },
    setValue: function(progressBarId, value,text) {
      $('#' + progressBarId+'-bar').css('width', value + '%');
	if(text!=undefined){    $('#' + progressBarId+'-label').html(text);}
	  
	  
var x = 4-(value.toString().length);
      $('#' + progressBarId+'-percentage').html(  new Array(x).join('&nbsp;')  + value+'%');
	  

    },
	 setLabel: function(progressBarId,text) {
      $('#' + progressBarId+'-label').html(text);
	   
 
    }
  },
  routeBar:{
	  update:function(path){
	//	  kt_core.panel.navigate.history[kt_core.panel.navigate.history.length-1];
	var route='';
	for(var i=0;i<path.length;i++){
	//route+=' <i class="fa fa-chevron-right"></i>&nbsp;' + path[i];
	route+='  <button type="button"  value="'+path[i]+'" onclick="kt_core.panel.navigate.go(this.value)" class="kt-routebar-item " ><i class="fa fa-chevron-right"></i>'+
	  kt_core.panel.get.byId(path[i]).panel.name+
	'</button>&nbsp;' 
	}
	
		  $('#'+'kt-routebar-inner').html(route);
		  
		  
	  }
  }

}