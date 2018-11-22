/** start标签功能 * */
// 修改标签内容
function changeTag() {
	var tagValue = $("#tagName").val();

	var labelList = tagValue.split(/[,;，；]/);
	var headText = "";
	for ( var i in labelList) {
		if (labelList[i] == "") {
			continue;
		}
		if (i == 0) {
			var text = labelList[i].replace(
					/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			headText += text;
		} else {
			var text = labelList[i].replace(
					/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
			headText += (',' + text);
		}
	}
	$("#tagName").val(headText);
	$("#inputTagName").val(headText);
}

// 限制直接添加标签输入
function noCommonAsLabel(obj) {
	var tag = $(obj);
	var text = tag.val();
	// 如果第一个字符串是,
	if (text[0] == ',' || text[0] == '，' || text[0] == ';' || text[0] == '；') {
		tag.val("");
	}

}

// 限制标签输入
function noComma(obj) {
	var tag = $(obj);
	var text = tag.text();
	if (text.indexOf(',') != -1) {
		tag.text('');
	}
}

function getTagsArr() {
	var tags = $("#addTags").val();
	var tagsArr = [];
	tagsArr = tags.split(",");
	return tagsArr;
}

// 打开标签管理
$(function() {
	var arr = getTagsArr();
	for ( var i in arr) {
		$("#addTagButton")
				.before(
						"<div class='tagClass'><span class='ontag select-tag' contenteditable='true' onkeyup='noComma(this)' onClick=clickIt(this) onBlur=blurIt(this)>"
								+ arr[i]
								+ "</span><span class='deleteTag' onmousedown='deleteOne(this)'>×</span></div>");
	}
	if (arr.length >= 5) {
		$("#addTagButton").hide();
	}
	findAllTag(arr);
})

// 打印所有的标签
function findAllTag(obj) {
	// 后台返取得arr
	var arr = [ 123, 345, 678, 101112, "我是陈小春", "大师兄", "渣渣辉",
			"dadsadasosaosadk", "我是掉dsadasdadsad" ];
	// 表面上获得arr
	var tagArr = obj;
	if (tagArr == null) {
		tagArr = [ '' ];
	}
	var isRepeat = false;
	for ( var i in arr) {
		var tagName = arr[i];
		for ( var j in tagArr) {
			var tagNames = tagArr[j];
			if (tagName == tagNames) {
				isRepeat = true;
				break;
			} else {
				isRepeat = false;
			}
		}
		if (isRepeat) {
			$("#allTag").append(
					'<div class="undertag select-tag" contenteditable="false">'
							+ tagName + '</div>');
		} else {
			$("#allTag").append(
					'<div class="undertag no-select-tag" contenteditable="false">'
							+ tagName + '</div>');
		}
	}
	verifyTagCount();
}

// 控制上面的标签编辑
function addTag() {
	$("#addTagButton")
			.before(
					"<div class='tagClass'><span class='ontag select-tag' contenteditable='true' onkeyup='noComma(this)' onClick=clickIt(this) onBlur=blurIt(this)></span><span class='deleteTag' onmousedown='deleteOne(this)'>×</span></div>");
	$("#addTagButton").prev().children("span").focus();
}

// 点击标签时造成的效果
function clickIt(obj) {
	var tag = $(obj);
	tag.attr('contenteditable', true);
	tag.focus();
}

// 更新input框里的值
function updateTags() {
	var $onTagArr = $('.ontag');
	var result = [];
	// input框里待定的value值
	var headText = '';
	$onTagArr.each(function() {
		result.push($(this).text());
	})
	for ( var i in result) {
		if (i == 0) {
			var text = result[i].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
					'');
			headText += text;
		} else {
			var text = result[i].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
					'');
			headText += (',' + text);
		}
	}
	$("#addTags").val(headText);
}

// 改变下层的样式，集体更新样式
function changeUnderStyle() {
	var onResult = getTagsArr();
	var $underTagArr = $('.undertag');
	var underResult = [];
	$underTagArr.each(function() {
		underResult.push($(this).text());
	})
	var isRepeat = false;
	for ( var i in underResult) {
		var underText = underResult[i];
		for ( var j in onResult) {
			var onText = onResult[j];
			if (onText == underText) {
				isRepeat = true;
				break;
			} else {
				isRepeat = false;
			}
		}
		if (isRepeat) {
			$(".undertag").eq(i).removeClass('no-select-tag select-tag');
			$(".undertag").eq(i).addClass('select-tag');
		} else {
			$(".undertag").eq(i).removeClass('no-select-tag select-tag');
			$(".undertag").eq(i).addClass('no-select-tag');
		}
	}
}

// 修改下面span样式
function blurIt(obj) {
	var tag = $(obj);
	var texts = tag.text();
	if (texts == '') {
		tag.parent().remove();
		// 重新改变input的值
		updateTags();
		changeUnderStyle();
	} else {
		var $onTagArr = $('.ontag');
		var verify = verifyTag(texts, 'on');
		if (verify) {
			updateTags();
			tag.attr('contenteditable', false);
			changeUnderStyle();
		} else {
			tag.parent().remove();
			updateTags();
		}
	}
	verifyTagCount();
}

// 验证标签
function verifyTag(obj, way) {
	var text = obj;
	// 从上面添加时的验证
	if (way == 'on') {
		// 验证下层
		var $onTagArr = $('.ontag');
		var result = [];
		// 记录次数
		var count = 0;
		$onTagArr.each(function() {
			result.push($(this).text());
		})
		for ( var i in result) {
			if (result[i] == text) {
				count++;
			}
		}
		if (count >= 2) {
			return false;
		}
		return true;
	}
	// 从下面添加验证
	if (way == 'under') {
		var $onTagArr = $('.ontag');
		var result = [];
		$onTagArr.each(function() {
			result.push($(this).text());
		})
		for ( var i in result) {
			if (result[i] == text) {
				return false;
			}
		}
		return true;
	}
}

// 取消一个标签
function deleteOne(obj) {
	$(obj).parent().remove();
	updateTags();
	verifyTagCount();
	changeUnderStyle();
}

// 从下面添加标签
// 当加入一个标签 下面的字体样式要跟随上面的同步
function addOriginalTag(obj) {
	var tag = $(obj);
	var tagName = tag.text();
	var verify = verifyTag(tagName, 'under');
	if (verify) {
		var onTag = $('#addTags').val();
		if (onTag == '') {
			$('#addTags').val(tagName);
		} else {
			var newText = onTag + ',' + tagName;
			$('#addTags').val(newText);
		}
		$("#addTagButton")
				.before(
						"<div class='tagClass'><span class='ontag select-tag' contenteditable='true' onkeyup='noComma(this)' onClick=clickIt(this) onBlur=blurIt(this)>"
								+ tagName
								+ "</span><span class='deleteTag' onmousedown='deleteOne(this)'>×</span></div>");
		tag.removeClass('no-select-tag');
		tag.addClass('select-tag');
		verifyTagCount();
	} else {
		// 删除上层标签操作
		var arr = getTagsArr();
		for ( var i in arr) {
			var text = arr[i];
			if (text == tagName) {
				$(".ontag").eq(i).parent().remove();
				tag.removeClass("select-tag");
				tag.addClass("no-select-tag");
			}
		}
		updateTags();
		verifyTagCount();
	}
}

// 判定5个标签之后不能继续添加标签
function verifyTagCount() {
	var onTagsArr = getTagsArr();
	if (onTagsArr.length >= 5) {
		$("#addTagButton").hide();
		$(".undertag.no-select-tag").unbind("mousedown");
	} else {
		$("#addTagButton").show();
		// 避免重复绑定带来的同一个操作被执行多次
		$(".undertag").unbind().bind("mousedown", function() {
			addOriginalTag(this);
		});
	}
}

// 提交标签
function chooseTagName() {
	var tags = $("#addTags").val();
	if (tags == '' || tags == null) {
		window.top.$.messager.alert('提示', "请选中一个标签！");
		return;
	}
	var tagsArr = getTagsArr();
	for (var i = 0; i < tagsArr.length - 1; i++) {
		for (var j = i + 1; j < tagsArr.length; j++) {
			if (tagsArr[i] == tagsArr[j]) {
				window.top.$.messager.alert('提示', "不能选取相同的标签！");
				return;
			}
		}
	}
	if (tagsArr.length > 5) {
		window.top.$.messager.alert('提示', "最多只能选取五个标签！");
		return;
	}
	window.top.$.messager.progress({
		msg : '添加中...'
	});
	window.top.$.messager.progress('close');

}

/** end标签 * */
