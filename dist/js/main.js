angular.module("nodeHype",[]).controller("mainController",(e,o)=>{e.formData={},e.hypeData={},o.get("/api/v1/hype").success(o=>{e.hypeData=o,console.log(o)}).error(e=>{console.log("Error: "+e)}),e.createHype=(()=>{o.post("/api/v1/hype",e.formData).success(o=>{e.formData={},e.hypeData=o,console.log(o)}).error(e=>{console.log("Error: "+e)})}),e.deleteHype=(r=>{o.delete("/api/v1/hype/"+r).success(o=>{e.hypeData=o,console.log(o)}).error(e=>{console.log("Error: "+e)})})});