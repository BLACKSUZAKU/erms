package cn.classroom.web.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import cn.classroom.dao.ClassroomDao;
import cn.classroom.dao.impl.ClassroomDaoImpl;
import cn.classroom.domain.Classroom;
import cn.classroom.domain.QueryResult;
import cn.classroom.domain.User;
import cn.classroom.exception.UserExistException;
import cn.classroom.service.BusinessService;
import cn.classroom.service.impl.BusinessServiceImpl;
import cn.classroom.utils.WebUtils;
import cn.classroom.web.formbean.AddClassroomForm;

public class AddClassroomServlet extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");
		// 1.У���ύ�������ֶν��кϷ���У��(�ѱ������ݷ�װ��formbean)
		AddClassroomForm form = WebUtils.request2Bean(request,
				AddClassroomForm.class);
		Boolean b = form.validate();

		// 2.���У��ʧ��,���ص�����ҳ��,����У��ʧ����Ϣ
		if (!b) {
			request.setAttribute("form", form);
			request.getRequestDispatcher("/WEB-INF/jsp/addclassroom.jsp").forward(
					request, response);
			return;
		}

		// 3.���У��ɹ�,�����service����ע������
		Classroom c = new Classroom();
		WebUtils.copyBean(form, c);
		ClassroomDao dao = new ClassroomDaoImpl();
		try {
			dao.addClassroom(c);
			// 6.���service�����ɹ�,�����û���������
			BusinessService service = new BusinessServiceImpl();
			QueryResult qr = service.queryClassroom();
			request.setAttribute("queryresult", qr);
			request.setAttribute("alert", "���ӽ��ҳɹ���");
			request.getRequestDispatcher("/WEB-INF/jsp/classroom-mana-main.jsp")
					.forward(request, response);
			return;
		} catch (Exception e) {
			// 5.���service�������ɹ�,���Ҳ��ɹ���ԭ������������Ļ�,����ת����վ��ȫ����Ϣ��ʾҳ��,Ϊ�û���ʾ�Ѻô�����Ϣ
			request.setAttribute("message", "���������ִ���");
			request.getRequestDispatcher("/message.jsp").forward(request,
					response);
			e.printStackTrace();
			return;
		}
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		doGet(request, response);
	}

}