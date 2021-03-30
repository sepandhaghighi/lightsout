# -*- coding: utf-8 -*-
import re
import os
import socket
import requests
from art import tprint

# Params
SERVICE_WORKER_ADDR = os.path.join(os.getcwd(),"service-worker.js")
JS_ADDR = os.path.join(os.getcwd(),"js","script.js")
VERSION_REGX = r'const version = .*'
CSS_MINIFIER_API = "https://cssminifier.com/raw"
CSS_ADDR = os.path.join(os.getcwd(),"css","style.css")
CSS_MIN_ADDR = os.path.join(os.getcwd(),"css","style.min.css")
JS_MINIFIER_API = "https://javascript-minifier.com/raw"
JS_MIN_ADDR = os.path.join(os.getcwd(),"js","script.min.js")

MENU_TEMPLATE = """
1. Current Version
2. Update Version (+ JS Minifier)
3. CSS Minifier
4. JS Minifier

Please Select :
"""

def file_size(addr):
    """
    Calculate file size.

    :param addr: file addresses
    :type addr: str
    :return: file size as float
    """
    file_info = os.stat(addr)
    file_size = file_info.st_size
    return file_size

def internet(host="8.8.8.8", port=53, timeout=3, debug=False):
    """
    Check internet connections.

    :param host: the host that check connection to
    :type host:str
    :param port: port that check connection with
    :type port:int
    :param timeout: times that check the connection
    :type timeout:int
    :param debug:flag for using debug mode
    :type debug:bool
    :return bool: True if connection is stable
    """
    try:
        socket.setdefaulttimeout(timeout)
        socket.socket(socket.AF_INET, socket.SOCK_STREAM).connect((host, port))
        return True
    except Exception as e:
        if debug:
            print(str(e))
        return False

def line(char="#", num=100):
    """
    Print line.

    :param char: character
    :type char: str
    :param num: number of characters
    :type num: int
    :return: None
    """
    print(char * num)

def css_minifier():
    """
    CSS minifier handler.

    :return: None
    """
    try:
        tprint("CSS Minifying","bulbhead")
        internet_status = internet()
        if not internet_status:
            raise Exception("Check Internet Connection")
        file = open(CSS_ADDR, "r", encoding="utf-8")
        css_text = file.read()
        file.close()
        response = requests.post(CSS_MINIFIER_API, data={"input": css_text})
        status_code = response.status_code
        if status_code == 200:
            css_minified = response.text
            file = open(CSS_MIN_ADDR, "w", encoding="utf-8")
            file.write(css_minified)
            file.close()
            css_size = file_size(CSS_ADDR)
            css_minified_size = file_size(CSS_MIN_ADDR)
            compression = round(100*(css_size - css_minified_size) / css_size, 2)
            print("Status : [OK] | Compression : {0} %".format(compression))
            line()
        else:
            raise Exception("Status Code --> {0}".format(status_code))
    except Exception as e:
        print("CSS Minifying Status : [Error]")
        print("Error Message : {0}".format(str(e)))
        line()

def js_minifier():
    """
    JS minifier handler.

    :return: None
    """
    try:
        tprint("JS Minifying","bulbhead")
        internet_status = internet()
        if not internet_status:
            raise Exception("Check Internet Connection")
        file = open(JS_ADDR, "r", encoding="utf-8")
        js_text = file.read()
        file.close()
        response = requests.post(JS_MINIFIER_API, data={"input": js_text})
        status_code = response.status_code
        if status_code == 200:
            js_minified = response.text
            file = open(JS_MIN_ADDR, "w", encoding="utf-8")
            file.write(js_minified)
            file.close()
            js_size = file_size(JS_ADDR)
            js_minified_size = file_size(JS_MIN_ADDR)
            compression = round(100*(js_size - js_minified_size)/js_size,2)
            print("Status : [OK] | Compression : {0} %".format(compression))
            line()
        else:
            raise Exception("Status Code --> {0}".format(status_code))
    except Exception as e:
        print("JS Minifying Status : [Error]")
        print("Error Message : {0}".format(str(e)))
        line()

def version_increment(version_input):
    """
    Increase version number.

    :param version_input: input version
    :type version_input: str
    :return: new version as str
    """
    version_splitted = version_input.split(".")
    digit = len(version_splitted)
    version_int = int("".join(version_splitted))
    version_int += 1
    version_inv = str(version_int)[::-1]
    version_inv += (digit - len(version_inv)) * "0"
    version_new = ""
    for i in range(digit-1):
        version_new += version_inv[i] + "."
    version_new += version_inv[digit-1:]
    return version_new[::-1]

def current_version(addr_dict):
    """
    Read current version of files.

    :param addr_dict: files name and address
    :type addr_dict: dict
    :return: None
    """
    tprint("Current Version", "bulbhead")
    for index, file_name in enumerate(sorted(addr_dict.keys())):
        try:
            addr = addr_dict[file_name]
            file = open(addr, "r", encoding="utf-8")
            data = file.read()
            file.close()
            version = re.search(VERSION_REGX, data).group(0).split('"')[1]
            print("{0} - {1} | Version : {2} | Status : {3}".format(str(index + 1), file_name, version, "[OK]"))
        except Exception as e:
            print("{0} - {1} | Status : {2}".format(str(index + 1), file_name, "[Error]"))
            print("Error Message : {0}".format(str(e)))
            line()
    line()

def version_update_handler(addr_dict):
    """
    Update files version.

    :param addr_dict: files name and address
    :type addr_dict: dict
    :return: None
    """
    tprint("Version Updating","bulbhead")
    for index, file_name in enumerate(sorted(addr_dict.keys())):
        try:
            addr = addr_dict[file_name]
            file = open(addr, "r", encoding="utf-8")
            data = file.read()
            file.close()
            old_version = re.search(VERSION_REGX, data).group(0).split('"')[1]
            new_version = version_increment(old_version)
            new_data = re.sub(VERSION_REGX, 'const version = "{0}";'.format(new_version), data)
            file = open(addr, "w", encoding="utf-8")
            file.write(new_data)
            file.close()
            print("{0} - {1} | Version : {2} | Status : {3}".format(str(index + 1), file_name, new_version, "[OK]"))
        except Exception as e:
            print("{0} - {1} | Status : {2}".format(str(index + 1), file_name, "[Error]"))
            print("Error Message : {0}".format(str(e)))
            line()
    line()


if __name__=="__main__":
    tprint("Lightsout Script")
    line()
    addr_dict = {"service-worker.js": SERVICE_WORKER_ADDR, "script.js": JS_ADDR}
    user_input = input(MENU_TEMPLATE)
    if "1" in user_input:
        current_version(addr_dict)
    if "2" in user_input:
        version_update_handler(addr_dict)
        js_minifier()
    if "3" in user_input:
        css_minifier()
    if ("4" in user_input) and ("2" not in user_input):
        js_minifier()



