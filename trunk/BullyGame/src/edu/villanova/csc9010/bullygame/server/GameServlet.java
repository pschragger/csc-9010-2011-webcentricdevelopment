package edu.villanova.csc9010.bullygame.server;
import java.io.IOException;
import javax.servlet.http.*;
import java.io.PrintWriter;
import org.json.simple.*;
import org.json.simple.parser.*;

public class GameServlet  extends HttpServlet
{

	private static final long serialVersionUID = 1L;
	JSONParser parser = new JSONParser();

    public void doGet(HttpServletRequest request, HttpServletResponse response)
              throws IOException
    {
        //set response error by default, change if content != null
        String returnString = "Error - content was null";
        response.setContentType("application/xhtml+xml");

        //get raw content from request
        request.setCharacterEncoding("UTF-8");
        String strJSON = request.getParameter("content");

        //parse the raw content into a json object
        Object obj;
        JSONObject jsonObj = null;
        try
        {
            obj = parser.parse(strJSON);
            jsonObj = (JSONObject)obj;
        }
        catch (Exception ex)
        {
        	System.err.println(ex);
        }

        //make sure json object is not null
        if (jsonObj!=null)
        {
            String Data = null;
            try
            {
            	//append the text " was parsed" to the data
                Data = jsonObj.get("Data").toString() + " was parsed"; 
            }
            catch (Exception e)
            {
            	//if there was an error, 
                Data = "data error";
            }
            
            //put data back into the json
            jsonObj.put("Data", Data);
            returnString = jsonObj.toJSONString();
        }

        //write the return string to the printer
        PrintWriter out = response.getWriter();
        out.printf(returnString);
        out.close();
        
    }
}
