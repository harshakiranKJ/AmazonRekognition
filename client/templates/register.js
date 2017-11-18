

Template.camera.onRendered(function() {
  
  Session.set('webcamSnap', null);
      Webcam.on( 'error', function(err) {
          console.log(err); // outputs error to console instead of window.alert
      });
  
      Webcam.set({
          width: 640,
          height: 480,
          dest_width: 640,
          dest_height: 480,
          image_format: 'jpeg',
          jpeg_quality: 100
      });
      Webcam.attach( '#webcam' );
  });
  
  Template.camera.events({
      'click .snap': function () {
          Webcam.snap( function(image) {
              Session.set('webcamSnap', image);
          })
      },
      'click .registerbtn': function(event){
        event.preventDefault();
        Session.set('webcamSnap', null);

        // Read the name to register
        

      }
  });
  
  Template.camera.helpers({
      image: function () {
          return Session.get('webcamSnap');
      }
  });


  Template.s3_tester.events({
	"click button.upload": function(){

        // Create a file from a base 64 image!
        var filess = [];
        filess[0] = datatoFile (Session.get('webcamSnap'), "kj.jpg")

        // Get the Name
        var nData = $("#name").val();

        //Upload
		S3.upload({
				files:filess,
				path:nData
			},function(e,r){
                sAlert.success('Image Uploaded succesfully!', {timeout: 1000, onClose: function() {console.log('closing alert in 1000ms...');}});
                Session.set('webcamSnap', null);
		});
	}
})

Template.s3_tester.helpers({
	"files": function(){
		return S3.collection.find();
	}
})

datatoFile = function (dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
