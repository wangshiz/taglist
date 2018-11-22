<%@ page language="java" contentType="text/html; charset=UTF-8"
  pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<link rel="stylesheet" href="./index.css">
<script type="text/javascript" src="./jquery.min.js"></script>
<script type="text/javascript" src="./index.js"></script>
<title>添加标签</title>
</head>
<body>
  <!-- 标签 --> 
  <input type="hidden" value="我是陈小春,你服不服"  id="addTags">   
  <div class="box" >
    <div class="text-box">
      <div id="pickTag"  class="pickTag"  >
        <input type="hidden" value=""  id="addTags">    
        <div id='addTagButton'  onclick="addTag();">添加标签</div>     
      </div>
      <p class="mt8"><span class="ipt-remark">最多添加5个标签</span></p>
     </div>
    <div id="allTag"></div>
  </div>
</body>

</html>