

$(function () {

	//��������
	$('#header .member').hover(function () {
		$(this).css('background', 'url(images/arrow2.png) no-repeat 55px center');
		$('#header .member_ul').show().animate({
			t : 30,
			step : 10,
			mul : {
				o : 100,
				h : 120
			}
		});
	}, function () {
		$(this).css('background', 'url(images/arrow.png) no-repeat 55px center');
		$('#header .member_ul').animate({
			t : 30,
			step : 10,
			mul : {
				o : 0,
				h : 0
			},
			fn : function () {
				$('#header .member_ul').hide();
			}
		});
	});
	
	
	//���ֻ���
	var screen = $('#screen');
	
	//��¼��
	var login = $('#login');
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .login').click(function () {
		login.center(350, 250).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#login .close').click(function () {
		login.hide();
		//��ִ�н��䶯����������Ϻ���ִ�йر�unlock
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//ע���
	var reg = $('#reg');
	reg.center(600, 550).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .reg').click(function () {
		reg.center(600, 550).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#reg .close').click(function () {
		reg.hide();
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//��ק
	login.drag($('#login h2').last());
	reg.drag($('#reg h2').last());
	
	//�ٶȷ����ʼ��λ��
	$('#share').css('top', getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	
	/*
	addEvent(window, 'scroll', function () {
		$('#share').animate({
			attr : 'y',
			target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
		});
	});
	*/
	
	$(window).bind('scroll', function () {
		setTimeout(function () {
			$('#share').animate({
				attr : 'y',
				target : getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
			});
		}, 100);
	});
	
	//�ٶȷ�������Ч��
	$('#share').hover(function () {
		$(this).animate({
			attr : 'x',
			target : 0
		});
	}, function () {
		$(this).animate({
			attr : 'x',
			target : -211
		});
	});
	
	//��������
	$('#nav .about li').hover(function () {
		var target = $(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : target + 20,
			t : 30,
			step : 10,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : -target
				});
			}
		});
	}, function () {
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : 20,
			t : 30,
			step : 10,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : 0
				});
			}
		});
	});
	
	//���˵�
	$('#sidebar h2').toggle(function () {
		$(this).next().animate({
			mul : {
				h : 0,
				o : 0
			}
		});
	}, function () {
		$(this).next().animate({
			mul : {
				h : 150,
				o : 100
			}
		});
	});

	
	//����֤
	
	//��ʼ��������
	$('form').eq(0).first().reset();
	
	//focus, blur
	//alert($('form').eq(0).first().user.value);
	//$('form').eq(0).form('user').value('bbb');
	
	$('form').eq(0).form('user').bind('focus', function () {
		$('#reg .info_user').show();
		$('#reg .error_user').hide();
		$('#reg .succ_user').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').hide();
			$('#reg .error_user').hide();
			$('#reg .succ_user').hide();
		} else if (!check_user()) {
			$('#reg .error_user').show();
			$('#reg .info_user').hide();
			$('#reg .succ_user').hide();
		} else {
			$('#reg .succ_user').show();
			$('#reg .error_user').hide();
			$('#reg .info_user').hide();
		}
	});
	
	function check_user() {
		var flag = true;
		if (!/[\w]{2,20}/.test(trim($('form').eq(0).form('user').value()))) {
			$('#reg .error_user').html('���벻�Ϸ������������룡');
			return false;
		} else {
			$('#reg .loading').show();
			$('#reg .info_user').hide();
			ajax({
				method : 'post',
				url : 'is_user.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#reg .error_user').html('�û�����ռ�ã�');
						flag = false;
					} else {
						flag = true;
					}
					$('#reg .loading').hide();
				},
				async : false
			});
		}
		return flag;
	}
	
	
	//������֤
	$('form').eq(0).form('pass').bind('focus', function () {
		$('#reg .info_pass').show();
		$('#reg .error_pass').hide();
		$('#reg .succ_pass').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_pass').hide();
		} else {
			if (check_pass()) {
				$('#reg .info_pass').hide();
				$('#reg .error_pass').hide();
				$('#reg .succ_pass').show();
			} else {
				$('#reg .info_pass').hide();
				$('#reg .error_pass').show();
				$('#reg .succ_pass').hide();
			}
		}
	});
	
	//����ǿ����֤
	$('form').eq(0).form('pass').bind('keyup', function () {
		check_pass();
	});
	
	//������֤����
	function check_pass() {
		var value = trim($('form').eq(0).form('pass').value());
		var value_length = value.length;
		var code_length = 0;
		
		//��һ��������������֤6-20λ֮��
		if (value_length >= 6 && value_length <= 20) {
			$('#reg .info_pass .q1').html('��').css('color', 'green');
		} else {
			$('#reg .info_pass .q1').html('��').css('color', '#666');
		}
		
		//�ڶ���������������֤����ĸ�����ֻ�ǿ��ַ�������һ������
		if (value_length > 0 && !/\s/.test(value)) {
			$('#reg .info_pass .q2').html('��').css('color', 'green');
		} else {
			$('#reg .info_pass .q2').html('��').css('color', '#666');
		}
		
		//������������������֤����д��ĸ��Сд��ĸ�����֣��ǿ��ַ� �������ֻ�ƴ����
		if (/[\d]/.test(value)) {
			code_length++;
		}
		
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		
		if (/[^\w]/.test(value)) {
			code_length++;
		}
		
		if (code_length >= 2) {
			$('#reg .info_pass .q3').html('��').css('color', 'green');
		} else {
			$('#reg .info_pass .q3').html('��').css('color', '#666');
		}
		
		//��ȫ����
		if (value_length >= 10 && code_length >= 3) {
			$('#reg .info_pass .s1').css('color', 'green');
			$('#reg .info_pass .s2').css('color', 'green');
			$('#reg .info_pass .s3').css('color', 'green');
			$('#reg .info_pass .s4').html('��').css('color', 'green');
		} else if (value_length >= 8 && code_length >= 2) {
			$('#reg .info_pass .s1').css('color', '#f60');
			$('#reg .info_pass .s2').css('color', '#f60');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('��').css('color', '#f60');
		} else if (value_length >= 1) {
			$('#reg .info_pass .s1').css('color', 'maroon');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('��').css('color', 'maroon');
		} else {
			$('#reg .info_pass .s1').css('color', '#ccc');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html(' ');
		}	
		
		if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
			return true;
		} else {
			return false;
		}
	}
	
	
	//����ȷ��
	$('form').eq(0).form('notpass').bind('focus', function () {
		$('#reg .info_notpass').show();
		$('#reg .error_notpass').hide();
		$('#reg .succ_notpass').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').hide();
		} else if (check_notpass()){
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').hide();
			$('#reg .succ_notpass').show();
		} else {
			$('#reg .info_notpass').hide();
			$('#reg .error_notpass').show();
			$('#reg .succ_notpass').hide();
		}
	});
	
	function check_notpass() {
		if (trim($('form').eq(0).form('notpass').value()) == trim($('form').eq(0).form('pass').value())) return true;
	}
	
	//����
	$('form').eq(0).form('ques').bind('change', function () {
		if (check_ques()) $('#reg .error_ques').hide();
	});
	
	function check_ques() {
		if ($('form').eq(0).form('ques').value() != 0) return true;
	}
	
	//�ش�
	$('form').eq(0).form('ans').bind('focus', function () {
		$('#reg .info_ans').show();
		$('#reg .error_ans').hide();
		$('#reg .succ_ans').hide();
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_ans').hide();
		} else if (check_ans()) {
			$('#reg .info_ans').hide();
			$('#reg .error_ans').hide();
			$('#reg .succ_ans').show();
		} else {
			$('#reg .info_ans').hide();
			$('#reg .error_ans').show();
			$('#reg .succ_ans').hide();
		}
	});
	
	function check_ans() {
		if (trim($('form').eq(0).form('ans').value()).length >= 2 && trim($('form').eq(0).form('ans').value()).length <= 32) return true;
	}
	
	//�����ʼ�
	$('form').eq(0).form('email').bind('focus', function () {
	
		//��ȫ����
		if ($(this).value().indexOf('@') == -1) $('#reg .all_email').show();
	
		$('#reg .info_email').show();
		$('#reg .error_email').hide();
		$('#reg .succ_email').hide();
	}).bind('blur', function () {
	
		//��ȫ����
		$('#reg .all_email').hide();
	
		if (trim($(this).value()) == '') {
			$('#reg .info_email').hide();
		} else if (check_email()) {
			$('#reg .info_email').hide();
			$('#reg .error_email').hide();
			$('#reg .succ_email').show();
		} else {
			$('#reg .info_email').hide();
			$('#reg .error_email').show();
			$('#reg .succ_email').hide();
		}
	});
	
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').eq(0).form('email').value()))) return true;
	}
	
	
	//�����ʼ���ȫϵͳ����
	$('form').eq(0).form('email').bind('keyup', function (event) {
		if ($(this).value().indexOf('@') == -1) {
			$('#reg .all_email').show();
			$('#reg .all_email li span').html($(this).value());
		} else {
			$('#reg .all_email').hide();
		}
		
		$('#reg .all_email li').css('background', 'none');
		$('#reg .all_email li').css('color', '#666');
		
		if (event.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#reg .all_email li').length() - 1) {
				this.index = 0;
			} else {
				this.index++;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		
		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('#reg .all_email li').length() - 1;
			} else {
				this.index--;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		
		
		if (event.keyCode == 13) {
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').hide();
			this.index = undefined;
		}
		
	});
	
	//�����ʼ���ȫϵͳ�����ȡ
	$('#reg .all_email li').bind('mousedown', function () {
		$('form').eq(0).form('email').value($(this).text());
	});
	
	//�����ʼ���ȫϵͳ��������Ƴ�Ч��
	$('#reg .all_email li').hover(function () {
		$(this).css('background', '#e5edf2');
		$(this).css('color', '#369');
	}, function () {
		$(this).css('background', 'none');
		$(this).css('color', '#666');
	});
	
	
	//������
	var year = $('form').eq(0).form('year');
	var month = $('form').eq(0).form('month');
	var day = $('form').eq(0).form('day');
	
	var day30 = [4, 6, 9, 11];
	var day31 = [1, 3, 5, 7, 8, 10, 12];
	
	//ע����
	for (var i = 1950; i <= 2013; i ++) {
		year.first().add(new Option(i, i), undefined);
	}
	
	//ע����
	for (var i = 1; i <= 12; i ++) {
		month.first().add(new Option(i, i), undefined);
	}
	
	
	year.bind('change', select_day);
	month.bind('change', select_day);
	day.bind('change', function () {
		if (check_birthday()) $('#reg .error_birthday').hide();
	});
	
	function check_birthday() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}
	
	function select_day() {
		if (year.value() != 0 && month.value() != 0) {
			
			//����֮ǰ��ע��
			day.first().options.length = 1;
			
			//��ȷ������
			var cur_day = 0;
			
			//ע����
			if (inArray(day31, parseInt(month.value()))) {
				cur_day = 31;
			} else if (inArray(day30, parseInt(month.value()))) {
				cur_day = 30;
			} else {
				if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
					cur_day = 29;
				} else {
					cur_day = 28;
				}
			}
			
			for (var i = 1; i <= cur_day; i ++) {
				day.first().add(new Option(i, i), undefined);
			}
			
		} else {
			//����֮ǰ��ע��
			day.first().options.length = 1;
		}
	}

	
	//��ע
	$('form').eq(0).form('ps').bind('keyup', check_ps).bind('paste', function () {
		//ճ���¼���������ճ�����ı���֮ǰ����
		setTimeout(check_ps, 50);
	});
	
	//��β
	$('#reg .ps .clear').click(function () {
		$('form').eq(0).form('ps').value($('form').eq(0).form('ps').value().substring(0,200));
		check_ps();
	});
	
	function check_ps() {
		var num = 200 - $('form').eq(0).form('ps').value().length;
		if (num >= 0) {
			$('#reg .ps').eq(0).show();
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).hide();
			return true;
		} else {
			$('#reg .ps').eq(0).hide();
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color', 'red');
			$('#reg .ps').eq(1).show();
			return false;
		}
	}
	
	//�ύ
	$('form').eq(0).form('sub').click(function () {
		var flag = true;
	
		if (!check_user()) {
			$('#reg .error_user').show();
			flag = false;
		}
		
		if (!check_pass()) {
			$('#reg .error_pass').show();
			flag = false;
		}
		
		if (!check_notpass()) {
			$('#reg .error_notpass').show();
			flag = false;
		}
		
		if (!check_ques()) {
			$('#reg .error_ques').show();
			flag = false;
		}
		
		if (!check_ans()) {
			$('#reg .error_ans').show();
			flag = false;
		}
		
		if (!check_email()) {
			$('#reg .error_email').show();
			flag = false;
		}
		
		if (!check_birthday()) {
			$('#reg .error_birthday').show();
			flag = false;
		}
		
		if (!check_ps()) {
			flag = false;
		}
	
		if (flag) {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('�����ύע����...');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'add.php',
				data : $('form').eq(0).serialize(),
				success : function (text) {
					if (text == 1) {
						$('#loading').hide();
						$('#success').show().center(200, 40);
						$('#success p').html('ע��ɹ������¼...');
						setTimeout(function () {
							$('#success').hide();
							reg.hide();
							$('#reg .succ').hide();
							$('form').eq(0).first().reset();
							_this.disabled = false;
							$(_this).css('backgroundPosition', 'left');
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function () {
									screen.unlock();
								}
							});
						}, 1500);
					}
				},
				async : true
			});
		}
		
	});
	
	$('form').eq(1).form('sub').click(function () {
		if (/[\w]{2,20}/.test(trim($('form').eq(1).form('user').value())) && $('form').eq(1).form('pass').value().length >= 6) {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('���ڳ��Ե�¼...');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'is_login.php',
				data : $('form').eq(1).serialize(),
				success : function (text) {
					$('#loading').hide();
					if (text == 1) {	  //ʧ��
						$('#login .info').html('��¼ʧ�ܣ��û��������벻��ȷ��');
					} else {  //�ɹ�
						$('#login .info').html('');
						$('#success').show().center(200, 40);
						$('#success p').html('��¼�ɹ������Ժ�...');
						setCookie('user', trim($('form').eq(1).form('user').value()));
						setTimeout(function () {
							$('#success').hide();
							login.hide();
							$('form').eq(1).first().reset();
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function () {
									screen.unlock();
								}
							});
							$('#header .reg').hide();
							$('#header .login').hide();
							$('#header .info').show().html(getCookie('user') + '�����ã�');
						}, 1500);
					}
					_this.disabled = false;
					$(_this).css('backgroundPosition', 'left');
				},
				async : true
			});
		} else {
			$('#login .info').html('��¼ʧ�ܣ��û��������벻�Ϸ���');
		}
	});

	
	//�ֲ�����ʼ��
	//$('#banner img').hide();
	//$('#banner img').eq(0).show();
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color', '#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	
	//�ֲ���������
	var banner_index = 1;
	
	//�ֲ���������
	var banner_type = 1; 		//1��ʾ͸���ȣ�2��ʾ���¹���
	
	//�Զ��ֲ���
	var banner_timer = setInterval(banner_fn, 3000);
	
	//�ֶ��ֲ���
	$('#banner ul li').hover(function () {
		clearInterval(banner_timer);
		if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333') {
			banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		}
	}, function () {
		banner_index = $(this).index() + 1;
		banner_timer = setInterval(banner_fn, 3000);
	});
	
	function banner(obj, prev) {
		$('#banner ul li').css('color', '#999');
		$(obj).css('color', '#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		
		if (banner_type == 1) {
			$('#banner img').eq(prev).animate({
				attr : 'o',
				target : 0,
				t : 30,
				step : 10
			}).css('zIndex', 1);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('zIndex', 2);
		} else if (banner_type == 2) {
			$('#banner img').eq(prev).animate({
				attr : 'y',
				target : 150,
				t : 30,
				step : 10
			}).css('zIndex', 1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'y',
				target : 0,
				t : 30,
				step : 10
			}).css('top', '-150px').css('zIndex', 2).opacity(100);
		}
		
	}
	
	function banner_fn() {
		if (banner_index >= $('#banner ul li').length()) banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		banner_index++;
	}
	
	
	//����1����xsrc��ַ�滻��src��ȥ
	//��ͼƬ���뵽�ɼ������ʱ�򣬽�ͼƬ��xsrc�ĵ�ַ�滻��src����
	//alert($('.wait_load').eq(0).attr('xsrc'));
	//$('.wait_load').eq(0).attr('src', $('.wait_load').eq(0).attr('xsrc'));
	
	
	//����2����ȡͼƬԪ�ص�����㶥��Ԫ�صľ���
	//alert(offsetTop($('.wait_load').first()));
	
	//����3����ȡҳ������������͵��λ��
	//alert(getInner().height + getScroll().top);
	
	var wait_load = $('.wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll', _wait_load);
	$(window).bind('resize', _wait_load);
	
	function _wait_load() {
		setTimeout(function () {
			for (var i = 0; i < wait_load.length(); i ++) {
				var _this = wait_load.ge(i);
				if (getInner().height + getScroll().top >= offsetTop(_this)) {
					$(_this).attr('src', $(_this).attr('xsrc')).animate({
						attr : 'o',
						target : 100,
						t : 30,
						step : 10
					});
				}
			}
		}, 100);
	}
	
	
	//ͼƬ����
	var photo_big = $('#photo_big');
	photo_big.center(620, 511).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#photo dl dt img').click(function () {
		photo_big.center(620, 511).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
		
		var temp_img = new Image();

		$(temp_img).bind('load', function () {
			$('#photo_big .big img').attr('src', temp_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
		});
		
		temp_img.src = $(this).attr('bigsrc');
		
		var children = this.parentNode.parentNode;
		
		prev_next_img(children);

	});
	$('#photo_big .close').click(function () {
		photo_big.hide();
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
		
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	});
	
	//��ק
	photo_big.drag($('#photo_big h2').last());
	
	/*
	//ͼƬ����
	$('#photo_big .big img').attr('src', 'http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg').animate({
		attr : 'o',
		target : 100,
		t : 30,
		step : 10
	}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
	
	//����1��loading����ʽ����ͼ�ĸߺͿ�ı���
	//����2�������Ľ���Ч��û�г���

	
	//����һ����ʱ��ͼƬ�������Ա���ͼƬ
	//alert($('#photo_big .big img').first());
	//alert(new Image());
	
	var temp_img = new Image();			//����һ����ʱ�����ͼƬ����

	$(temp_img).bind('load', function () {
		$('#photo_big .big img').attr('src', temp_img.src).animate({
			attr : 'o',
			target : 100,
			t : 30,
			step : 10
		}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
	});
	
	//IE�����src������Է���load�¼����������Ч
	temp_img.src = 'http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg';  //src���Կ����ں�̨��������ͼƬ�����ػ���
	*/
	
	
	//ͼƬ��껮��
	$('#photo_big .big .left').hover(function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	
	//ͼƬ��껮��
	$('#photo_big .big .right').hover(function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	
	
	//ͼƬ��һ�� 
	$('#photo_big .big .left').click(function () {
	
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	
		var current_img = new Image();
	
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});

		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);

		
	});
	
	
	//ͼƬ��һ��
	$('#photo_big .big .right').click(function () {
	
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	
		var current_img = new Image();
	
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});

		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);

		
	});
	
	function prev_next_img(children) {
		var prev = prevIndex($(children).index(), children.parentNode);
		var next = nextIndex($(children).index(), children.parentNode);
		
		var prev_img = new Image();
		var next_img = new Image();
		
		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src', prev_img.src);
		$('#photo_big .big .right').attr('src', next_img.src);
		$('#photo_big .big img').attr('index', $(children).index());
		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo dl dt img').length());
	}
	
	//����ajax
	/*
	$(document).click(function () {
		ajax({
			method : 'post',
			url : 'demo.php',
			data : {
				'name' : 'Lee',
				'age' : 100
			},
			success : function (text) {
				alert(text);
			},
			async : true
		});
	});
	*/
	
	//�����ĵ���
	$('#blog').center(580, 320).resize(function () {
		if ($('#blog').css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .member a').eq(0).click(function () {
		$('#blog').center(580, 320).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#blog .close').click(function () {
		$('#blog').hide();
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//��ק
	$('#blog').drag($('#blog h2').last());
	
	$('form').eq(2).form('sub').click(function () {
		if (trim($('form').eq(2).form('title').value()).length <= 0 || trim($('form').eq(2).form('content').value()).length <= 0) {
			$('#blog .info').html('����ʧ�ܣ���������ݲ���Ϊ�գ�');
		} else {
			var _this = this;
			$('#loading').show().center(200, 40);
			$('#loading p').html('���ڷ�����...');
			_this.disabled = true;
			$(_this).css('backgroundPosition', 'right');
			ajax({
				method : 'post',
				url : 'add_blog.php',
				data : $('form').eq(2).serialize(),
				success : function (text) {
					$('#loading').hide();
					if (text == 1) {	
						$('#blog .info').html('');
						$('#success').show().center(200, 40);
						$('#success p').html('����ɹ������Ժ�...');
						setTimeout(function () {
							$('#success').hide();
							$('#blog').hide();
							$('form').eq(2).first().reset();
							screen.animate({
								attr : 'o',
								target : 0,
								t : 30,
								step : 10,
								fn : function () {
									screen.unlock();
									$('#index').html('<span class="loading"></span>');
									$('#index .loading').show();
									ajax({
										method : 'post',
										url : 'get_blog.php',
										data : {},
										success : function (text) {
											$('#index .loading').hide();
											var json = JSON.parse(text);
											var html = '';
											for (var i = 0; i < json.length; i ++) {
												html += '<div class="content"><h2><em>' +  json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
											}
											$('#index').html(html);
											for (var i = 0; i < json.length; i ++) {
												$('#index .content').eq(i).animate({
													attr : 'o',
													target : 100,
													t : 30,
													step : 10
												});
											}
										},
										async : true
									});
								}
							});
							_this.disabled = false;
							$(_this).css('backgroundPosition', 'left');
						}, 1500);
					}
				},
				async : true
			});
		}
	});
	
	
	
	//��ȡ�����б�
	$('#index').html('<span class="loading"></span>');
	$('#index .loading').show();
	ajax({
		method : 'post',
		url : 'get_blog.php',
		data : {},
		success : function (text) {
			$('#index .loading').hide();
			var json = JSON.parse(text);
			var html = '';
			for (var i = 0; i < json.length; i ++) {
				html += '<div class="content"><h2><em>' +  json[i].date + '</em>' + json[i].title + '</h2><p>' + json[i].content + '</p></div>';
			}
			$('#index').html(html);
			for (var i = 0; i < json.length; i ++) {
				$('#index .content').eq(i).animate({
					attr : 'o',
					target : 100,
					t : 30,
					step : 10
				});
			}
		},
		async : true
	});
		
		
	//����Ƥ������
	$('#skin').center(650, 360).resize(function () {
		if ($('#skin').css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .member a').eq(1).click(function () {
		$('#skin').center(650, 360).show();
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
		$('#skin .skin_bg').html('<span class="loading"></span>');
		ajax({
			method : 'post',
			url : 'get_skin.php',
			data : {
				'type' : 'all'
			},
			success : function (text) {
				var json = JSON.parse(text);
				var html = '';
				for (var i = 0; i < json.length; i ++) {
					html += '<dl><dt><img src="images/' + json[i].small_bg + '" big_bg="' + json[i].big_bg + '" bg_color="' + json[i].bg_color + '" alt=""></dt><dd>' + json[i].bg_text + '</dd></dl>';
				}
				$('#skin .skin_bg').html(html).opacity(0).animate({
					attr : 'o',
					target : 100,
					t : 30,
					step :10
				});
				$('#skin dl dt img').click(function () {
					$('body').css('background', $(this).attr('bg_color') + ' ' + 'url(images/' + $(this).attr('big_bg') + ') repeat-x');
					ajax({
						method : 'post',
						url : 'get_skin.php',
						data : {
							'type' : 'set',
							'big_bg' : $(this).attr('big_bg')
						},
						success : function (text) {
							$('#success').show().center(200, 40);
							$('#success p').html('Ƥ�������ɹ�...');
							setTimeout(function () {
								$('#success').hide();
							}, 1500);
						},
						async : true
					});
				});
			},
			async : true
		});
	});
	$('#skin .close').click(function () {
		$('#skin').hide();
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//��ק
	$('#skin').drag($('#skin h2').last());
	
	//Ĭ����ʾ������ʽ
	ajax({
		method : 'post',
		url : 'get_skin.php',
		data : {
			'type' : 'main'
		},
		success : function (text) {
			var json = JSON.parse(text);
			$('body').css('background', json.bg_color + ' ' + 'url(images/' + json.big_bg + ') repeat-x');
		},
		async : true
	});
		
});












