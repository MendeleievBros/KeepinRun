var TERRAINGEN={CreateCanvas:function(inWidth,inHeight)
{var canvas=document.createElement("canvas");canvas.width=inWidth;canvas.height=inHeight;return canvas;},CreateVertices:function(inNoise,inGeometry,inDepth,inWidth,inHeight)
{var positions=inGeometry.getAttribute('position').array;var context=inNoise.getContext('2d'),imgData=context.getImageData(0,0,inNoise.width,inNoise.height),pixels=imgData.data,scaleX=inWidth/(inNoise.width-1),scaleY=inDepth/255,scaleZ=inHeight/(inNoise.height-1),id=0,pixel=0
offsetX=-inNoise.width/2,offsetZ=-inNoise.height/2;for(var y=0;y<inNoise.height;++y)
{for(var x=0;x<inNoise.width;++x)
{positions[id++]=scaleX*(x+offsetX);positions[id++]=scaleY*(pixels[(pixel++)*4+1]);positions[id++]=scaleZ*(y+offsetZ);}}},CreateFaces:function(inGeometry,inWidth,inHeight)
{var indices=inGeometry.getAttribute('index').array;var id=0;for(var y=0;y<inHeight-1;++y)
{for(var x=0;x<inWidth-1;++x)
{indices[id++]=y*inWidth+x+1;indices[id++]=y*inWidth+x;indices[id++]=(y+1)*inWidth+x;indices[id++]=(y+1)*inWidth+x+1;indices[id++]=y*inWidth+x+1;indices[id++]=(y+1)*inWidth+x;}}},CreateGeometry:function(inNoise,inDepth,inWidth,inHeight,inWidthSegments,inHeightSegments)
{var geometry=new THREE.BufferGeometry();var nbPoints=inNoise.width*inNoise.height;var indices=(inNoise.width-1)*(inNoise.height-1)*2*3;geometry.addAttribute('index',new THREE.Uint32Attribute(indices,1));geometry.addAttribute('color',new THREE.Float32Attribute(nbPoints,3));geometry.addAttribute('position',new THREE.Float32Attribute(nbPoints,3));this.CreateVertices(inNoise,geometry,inDepth,inWidth,inHeight);this.CreateFaces(geometry,inWidthSegments,inHeightSegments);return geometry;},ConstructTerrain:function(inNoise,inParameters)
{var geometry=this.CreateGeometry(inNoise,inParameters.depth,inParameters.width,inParameters.height,inParameters.widthSegments,inParameters.heightSegments);for(var i=0;i<inParameters.effect.length;++i)
{if(null!==inParameters.effect[i])
inParameters.effect[i].Apply(geometry,inParameters);}
for(var i=0;i<inParameters.postgen.length;++i)
{if(null!==inParameters.postgen[i])
inParameters.postgen[i].Apply(geometry,inParameters);}
geometry.computeFaceNormals();geometry.computeVertexNormals();geometry.attributes.color.needsUpdate=true;geometry.attributes.index.needsUpdate=true;geometry.attributes.position.needsUpdate=true;return geometry;},GetCanvas:function(inParameters)
{inParameters=inParameters||{};inParameters.type=inParameters.type||0;inParameters.depth=inParameters.depth||10;inParameters.width=inParameters.width||100;inParameters.height=inParameters.height||100;inParameters.widthSegments=inParameters.widthSegments||100;inParameters.heightSegments=inParameters.heightSegments||100;inParameters.postgen=inParameters.postgen||[];inParameters.effect=inParameters.effect||[];inParameters.filter=inParameters.filter||[];if(typeof inParameters.canvas=='undefined')
inParameters.canvas=this.CreateCanvas(inParameters.width,inParameters.height);inParameters.canvas.width=inParameters.widthSegments;inParameters.canvas.height=inParameters.heightSegments;$(inParameters.canvas).width(inParameters.widthSegments);$(inParameters.canvas).height(inParameters.heightSegments);var noise=inParameters.generator.Get(inParameters);for(var i=0;i<inParameters.filter.length;++i)
{if(null!==inParameters.filter[i])
inParameters.filter[i].Apply(noise,inParameters);}
return noise;},Get:function(inParameters)
{return this.ConstructTerrain(this.GetCanvas(inParameters),inParameters);},GetFromCanvas:function(inParameters,inCanvas,inX,inY,inWidth,inHeight)
{var noise=this.CreateCanvas(inWidth,inHeight);var imageData=inCanvas.getContext("2d").getImageData(inX,inY,inWidth,inHeight);noise.getContext("2d").putImageData(imageData,0,0,0,0,inWidth,inHeight);var scaleWidth=inWidth/inParameters.widthSegments;var scaleHeight=inHeight/inParameters.heightSegments;var parameters=Object.create(inParameters);parameters.widthSegments=inWidth;parameters.heightSegments=inHeight;parameters.width=Math.floor(parameters.width*scaleWidth);parameters.height=Math.floor(parameters.height*scaleHeight);parameters.heightSegments=inHeight;return this.ConstructTerrain(noise,parameters);},};
